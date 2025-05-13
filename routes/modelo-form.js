const express = require('express');
const router = express.Router();
const connection = require('../db');
//hash y criptojs
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');



// Crear nuevo usuario
router.post('/guardar', async (req, res) => {
    const { tipoDoc, numDoc, nombre, apellido, nombreUsuario, claveUsuario, correo } = req.body;
    try {
        const query = 'INSERT INTO usuario (tipoDoc, numDoc, nombre, apellido, nombreUsuario, claveUsuario, correo) VALUES (?, ?, ?, ?, ?, ?, ?)';
        
        // Genera el hash con bcrypt
        const hash = await bcrypt.hash(claveUsuario, 10);

        // Genera el cifrado con CryptoJS (AES)
        const encrypted = CryptoJS.AES.encrypt(claveUsuario, 'mi_clave_secreta').toString();

        const values = [tipoDoc, numDoc, nombre, apellido, nombreUsuario, hash, correo];
        
        connection.query(query, values, (error, results) => {
           
            if (error) {
                console.error('Error al guardar: ' + error.message);
                res.send('Error al guardar');
            } else {
                console.log('Hash generado:', hash);
                console.log('Cifrado generado:', encrypted);
                console.log('Datos guardados');
                res.json({
                    mensaje: 'Datos guardados correctamente',
                    hash: hash,
                    cifrado: encrypted
                });
            }
        });
    } catch (err) {
        console.error('Error en el try:', err);
        res.status(500).send('Error interno del servidor');
    }
});

// READ (ver todos los usuarios)
router.get('/usuarios/:numDoc', (req, res) => {
    const  numDoc  = req.params.numDoc;
    connection.query('SELECT * FROM usuario WHERE numDoc = ?', [numDoc], (err, results) => {
        if (err || results.length === 0) return res.json(null);
        res.json(results[0]);
    });
});

// UPDATE (actualizar un usuario por numDoc)
router.put('/actualizar', (req, res) => {
    const { tipoDoc, numDoc, nombre, apellido, nombreUsuario, claveUsuario, correo } = req.body;
    const query = 'UPDATE usuario SET tipoDoc=?, nombre=?, apellido=?, nombreUsuario=?, claveUsuario=?, correo=? WHERE numDoc=?';
    connection.query(query, [tipoDoc, nombre, apellido, nombreUsuario, claveUsuario, correo, numDoc], (err) => {
        if (err) return res.json('Error al actualizar');
        res.json('Actualizado correctamente');
    });
});

// DELETE (eliminar un usuario por numDoc)
router.delete('/eliminar/:numDoc', (req, res) => {
    const  numDoc  = req.params.numDoc;
    connection.query('DELETE FROM usuario WHERE numDoc = ?', [numDoc], (err) => {
        if (err) return res.send('Error al eliminar');
        res.json('Eliminado correctamente');
    });
});

// LOGIN
router.post('/login', (req, res) => {
    const { nombreUsuario, claveUsuario } = req.body;

    const query = 'SELECT * FROM usuario WHERE nombreUsuario = ?';
    connection.query(query, [nombreUsuario], async (err, results) => {
        const hashGenerado = await bcrypt.hash(claveUsuario, 10); // Genera el hash siempre
        const cifrado = CryptoJS.AES.encrypt(claveUsuario, 'mi_clave_secreta').toString(); // Cifra la contraseña

        if (err || results.length === 0) {
            return res.status(401).json({
                mensaje: 'Usuario no encontrado',
                hashGenerado, // Envia el hash generado
                hashBD: null,
                cifrado
            });
        }

        const usuario = results[0];
        const hashBD = usuario.claveUsuario;

        const match = await bcrypt.compare(claveUsuario, hashBD); // Compara la contraseña con el hash en la base de datos

        // Ya no es necesario declarar `cifrado` de nuevo
        res.json({
            mensaje: match ? 'Login exitoso' : 'Contraseña incorrecta',
            hashGenerado, // Envia siempre el hash generado
            hashBD,
            cifrado // Utiliza el mismo cifrado que ya habías generado antes
        });
    });
});


module.exports = router;
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
                console.log('Datos guardados');
                
                // Asegúrate de pasar estos valores correctamente
                res.render('login', {
                    claveOriginal: claveUsuario,  // Aquí pasas la contraseña original
                    hash: hash,  // Aquí pasas el hash generado
                    cifrado: encrypted  // Aquí pasas el valor cifrado
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
        if (err || results.length === 0) {
            return res.status(401).send('Usuario no encontrado');
        }

        const usuario = results[0];
        
        const match = await bcrypt.compare(claveUsuario, usuario.claveUsuario);

        if (match) {
            res.send('Login exitoso');
        } else {
            res.status(401).send('Contraseña incorrecta');
        }
    });
});


module.exports = router;
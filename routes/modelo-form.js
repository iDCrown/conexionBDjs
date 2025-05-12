const express = require('express');
const router = express.Router();
const connection = require('../db');



// CREATE (insertar nuevo usuario)
router.post('/guardar', (req, res) => {
    const { tipoDoc, numDoc, nombre, apellido, nombreUsuario, claveUsuario, correo } = req.body;
    const query = 'INSERT INTO usuario (tipoDoc, numDoc, nombre, apellido, nombreUsuario, claveUsuario, correo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [tipoDoc, numDoc, nombre, apellido, nombreUsuario, claveUsuario, correo];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al guardar: ' + error.message);
            res.send('Error al guardar');
        } else {
            console.log('Datos guardados');
            res.send('Datos guardados correctamente');
        }
    });
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

module.exports = router;
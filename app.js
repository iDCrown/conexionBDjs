const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Servir el HTML para mostrarlo en el servidor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'conexionBD'
})
//Manejo de error de base de datos y confirmación de la respuesta exitosa
connection.connect(error => {
    if(error){
        return console.log('errror en la conexion ' + error.message);
    } 
    console.log('conectada la base de datos MySQL');
});



// CREATE (insertar nuevo usuario)
app.post('/guardar', (req, res) => {
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
app.get('/usuarios/:numDoc', (req, res) => {
    const  numDoc  = req.params.numDoc;
    connection.query('SELECT * FROM usuario WHERE numDoc = ?', [numDoc], (err, results) => {
        if (err || results.length === 0) return res.json(null);
        res.json(results[0]);
    });
});

// UPDATE (actualizar un usuario por numDoc)
app.put('/actualizar', (req, res) => {
    const { tipoDoc, numDoc, nombre, apellido, nombreUsuario, claveUsuario, correo } = req.body;
    const query = 'UPDATE usuario SET tipoDoc=?, nombre=?, apellido=?, nombreUsuario=?, claveUsuario=?, correo=? WHERE numDoc=?';
    connection.query(query, [tipoDoc, nombre, apellido, nombreUsuario, claveUsuario, correo, numDoc], (err) => {
        if (err) return res.json('Error al actualizar');
        res.json('Actualizado correctamente');
    });
});

// DELETE (eliminar un usuario por numDoc)
app.delete('/eliminar/:numDoc', (req, res) => {
    const  numDoc  = req.params.numDoc;
    connection.query('DELETE FROM usuario WHERE numDoc = ?', [numDoc], (err) => {
        if (err) return res.send('Error al eliminar');
        res.json('Eliminado correctamente');
    });
});

//aviso para confirmar por donde corre el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
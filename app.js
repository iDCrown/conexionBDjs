const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'conexionBD'
})

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
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuario';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener usuarios: ' + error.message);
            res.send('Error al obtener usuarios');
        } else {
            res.json(results);
        }
    });
});

// UPDATE (actualizar un usuario por numDoc)
app.post('/actualizar', (req, res) => {
    const { tipoDoc, nombre, apellido, nombreUsuario, claveUsuario, correo, numDoc } = req.body;
    const query = 'UPDATE usuario SET tipoDoc = ?, nombre = ?, apellido = ?, nombreUsuario = ?, claveUsuario = ?, correo = ? WHERE numDoc = ?';
    const values = [tipoDoc, nombre, apellido, nombreUsuario, claveUsuario, correo, numDoc];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar: ' + error.message);
            res.send('Error al actualizar');
        } else {
            console.log('Usuario actualizado');
            res.send('Usuario actualizado correctamente');
        }
    });
});

// DELETE (eliminar un usuario por numDoc)
app.post('/eliminar', (req, res) => {
    const { numDoc } = req.body;
    const query = 'DELETE FROM usuario WHERE numDoc = ?';

    connection.query(query, [numDoc], (error, results) => {
        if (error) {
            console.error('Error al eliminar: ' + error.message);
            res.send('Error al eliminar');
        } else {
            console.log('Usuario eliminado');
            res.send('Usuario eliminado correctamente');
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


const mysql = require('mysql')

const connection = mysql.createConnectio({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'conexionBD'
})

connection.connect(error => {
    if(error){
        return console.log('errror en la conexion ' + error.message);
    } 
    console.log('conectada la base de datos MySQL')
})

app.post('/guardar', (req, res) => {
    const { tipoDoc, numDoc, nombre, apellido, nombreUsuario, claveUsuario, correo } = req.body;

    const query = 'INSERT INTO ejemplo (tipoDoc, numDoc, nombre, apellido, nombreUsuario, claveUsuario, correo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [tipoDoc, numDoc, nombre, apellido, nombreUsuario, claveUsuario, correo];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al guardar en la base de datos: ' + error.message);
            res.send('Error al guardar');
        } else {
            console.log('Datos guardados correctamente');
            res.send('Datos guardados correctamente');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
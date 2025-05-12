const mysql = require('mysql');

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'conexionBD'
});

connection.connect(error => {
    if (error) {
        return console.log('Error en la conexión ' + error.message);
    }
    console.log('Conectada la base de datos MySQL');
});

module.exports = connection;
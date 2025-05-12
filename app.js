const express = require('express');
const path = require('path');
const app = express();

// Middleware para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Aquí

// Rutas
const usuariosRouter = require('./routes/modelo-form');
app.use('/', usuariosRouter);

// Ruta principal que devuelve tu index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'vistas', 'login.html'));
});


// Arranque del servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

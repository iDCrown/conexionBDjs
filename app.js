const express = require('express');
const path = require('path');
const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public'))); 

// Rutas
const usuariosRouter = require('./routes/modelo-form');
app.use('/usuarios', usuariosRouter);  // Cambio aquí para diferenciar las rutas

// Ruta principal que devuelve la vista de login en EJS
app.get('/', (req, res) => {
    res.render('login');  // Cambié de sendFile a render para usar EJS
});

// Arranque del servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

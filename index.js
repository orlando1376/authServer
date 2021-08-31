const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');

// carga el archivo .env en las variables de ambiente
require('dotenv').config();

// crear la aplicación de express
const app = express();

// base de datos
dbConnection();

// middleware

// directorio público. Redirecciona al archivo public\index.html
app.use(express.static('public'));

// CORS
app.use(cors());

// lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Manejo de las demas rutas. 
// Para arreglar el error de rutas en producción
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});
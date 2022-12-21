const express = require('express');
const moviesApi = require('./routes/movies')

const app = express();

/* Middleware para parsear la data entrante */
app.use(express.json());

/* Puerto quemado en 3000 */
const {config} = require('./config/index')

/* Servidor con CRUD(get, post, put, update, delete) */
moviesApi(app)

/* Manejo del error 404 */
//app.use(notFoundHandler)


/* Capa de middleware (manejo de errores) */
//app.use(logErrors)
//app.use(wrapErrors)
//app.use(errorHandler)

/* Escuchando servidor */
app.listen(config.port, () =>console.log('http://localhost:3000: Backend of movies'))
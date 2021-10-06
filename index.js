const express = require('express');
const app = express();
const moviesMock = require('./utils/mocks/movies')
const moviesApi = require('./routes/movies')


/* Middleware para parsear la data entrante */
app.use(express.json());

/* Puerto quemado en 3000 */
const {config} = require('./config/index')

/* Servidor directo con express */
app.get('/', function(req, res){
    res.send('Deimar Perea')
})

app.get('/json', function(req, res){
    res.json(moviesMock)
})

/* Servidor con CRUD(get, post, put, update, delete) */
moviesApi(app)

/* Manejo del error 404 */
//app.use(notFoundHandler)


/* Capa de middleware (manejo de errores) */
//app.use(logErrors)
//app.use(wrapErrors)
//app.use(errorHandler)

/* Escuchando servidor */
app.listen(config.port, () =>console.log('http://localhost:3000'))
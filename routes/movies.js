const express = require('express');
const MoviesService = require('../service/movies')
const moviesMock = require('../utils/mocks/movies')
const colors = require('colors'); // eslint-disable-line
const {
    movieIdSchema,
    createMovieSchema,
    updateMoviesSchema
} = require('../utils/schemas/movies')

function moviesApi(app){

    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    router.get('/', async (req, res, next) => {

        const { tags } = req.query;
        console.log(req.query .magenta)
        try{
            const movies = await moviesService.getMovies({tags})
            res.status(200).json({
                data: movies,
                message: 'Peliculas enviadas mano'
            })
        } catch(err){
            next(err);
        }
    })

    router.get('/:movieId', async (req, res, next) => {

        const movieId = req.params

        try{
            const movie = await moviesService.getMovies({movieId})
            console.log(moviesMock.moviesMock[0], req.params .magenta)
            res.status(200).json({
                data: movie,
                message: 'Pelicula especifica'
            })
        } catch(err){
            next(err);
        }
    })

    router.post('/', async (req, res, next) => {

        const {body : movie} = req;
        try{
            console.log(moviesMock.moviesMock[0].id .bgMagenta)
            const createMovieId = await moviesService.createMovie({movie})
            res.status(201).json({
                data: createMovieId,
                message: 'Pelicula creada mano'
            })
        } catch(err){
            next(err);
        }
    })

    router.put('/:movieId', async (req, res, next) => {
        const {movieId} = req.params;
        const {body: movie} = req;
        try{
            console.log(moviesMock.moviesMock[0].id)
            const updateMovieId = await moviesService.updateMovie({movieId, movie})
            res.status(200).json({
                data: updateMovieId,
                message: 'Pelicula actualizada mano'
            })
        } catch(err){
            next(err);
        }
    })

    router.delete('/:movieId', async (req, res, next) => {
        const movieId = req.params
        try{
            console.log(moviesMock.moviesMock[0].id);
            const deleteMovieId = await moviesService.deleteMovie({movieId})
            res.status(200).json({
                data: deleteMovieId,
                message: 'Pelicula eliminada mano'
            })
        } catch(err){
            next(err);
        }
    })
}

module.exports = moviesApi;
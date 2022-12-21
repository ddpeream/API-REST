const express = require("express");
const MoviesService = require("../service/movies");
// const moviesMock = require("../utils/mocks/movies");
const colors = require("colors"); // eslint-disable-line
// const {
//     movieIdSchema,
//     createMovieSchema,
//     updateMoviesSchema
// } = require('../utils/schemas/movies')

function moviesApi(app) {
  const router = express.Router();
  app.use("/api/movies", router);

  const moviesService = new MoviesService();

  router.get("/", async (req, res, next) => {
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });
    //   throw new Error('error al obtener la pelicula')
      res.status(200).json({
        message: "Peliculas enviadas",
        data: movies,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:movieId", async (req, res, next) => {
    const movieId = req.params;

    try {
      const movie = await moviesService.getMovie({ movieId });
      res.status(200).json({
        message: "Pelicula Especifica",
        data: movie,
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    const { body: movie } = req;
    try {
      const createMovieId = await moviesService.createMovie({ movie });
      res.status(201).json({
        message: "Pelicula Creada",
        data: createMovieId,
      });
    } catch (err) {
      next(err);
    }
  });

  router.put("/:movieId", async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updateMovieId = await moviesService.updateMovie({ movieId, movie });
      res.status(200).json({
        message: "Pelicula Actualizada",
        data: updateMovieId,
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:movieId", async (req, res, next) => {
    const movieId = req.params;
    try {
      const deleteMovieId = await moviesService.deleteMovie({ movieId });
      res.status(200).json({
        message: "Pelicula Eliminada",
        data: deleteMovieId,
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesApi;

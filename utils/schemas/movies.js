const joi = require('@hapi/joi');

const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const movieTitleSchema = joi.string().max(80)
const movieYearSchema = joi.string().min(1980).max(2077)
const movieCoverSchema = joi.string().uri()
const movieDescriptionSchema = joi.string().max(300)
const movieDurationSchema = joi.number().min(1).max(300)
const movieContentRatingSchema = joi.string().max(5)
const movieSourceSchema = joi.string().uri()


const createMovieSchema = {
    title: movieTitleSchema.required(),
    year: movieYearSchema.required(),
    cover: movieCoverSchema.required(),
    description: movieDescriptionSchema.required(),
    duration: movieDurationSchema.required(),
    contentRating: movieContentRatingSchema.required(),
    source: movieSourceSchema.required(),
}

const updateMoviesSchema = {
    title: movieTitleSchema,
    year: movieYearSchema,
    cover: movieCoverSchema,
    description: movieDescriptionSchema,
    duration: movieDurationSchema,
    contentRating: movieContentRatingSchema,
    source: movieSourceSchema,
}

module.exports = {
    movieIdSchema,
    createMovieSchema,
    updateMoviesSchema
}
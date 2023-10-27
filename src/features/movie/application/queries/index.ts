import { GetMovieByIdQueryHandler } from './get-movie-by-id/get-movie-by-id.handler'
import { GetMoviesQueryHandler } from './get-movies/get-movies.handler'

export const MovieQueryHandlers = [
  GetMoviesQueryHandler,
  GetMovieByIdQueryHandler
]

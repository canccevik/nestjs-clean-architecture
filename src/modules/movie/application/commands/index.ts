import { CreateMovieCommandHandler } from './create-movie/create-movie.handler'
import { UpdateMovieByIdCommandHandler } from './update-movie-by-id/update-movie-by-id.handler'

export const MovieCommandHandlers = [
  CreateMovieCommandHandler,
  UpdateMovieByIdCommandHandler
]

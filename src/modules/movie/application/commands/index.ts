import { CreateMovieCommandHandler } from './create-movie/create-movie.handler'
import { DeleteMovieByIdCommandHandler } from './delete-movie-by-id/delete-movie-by-id.handler'
import { UpdateMovieByIdCommandHandler } from './update-movie-by-id/update-movie-by-id.handler'

export const MovieCommandHandlers = [
  CreateMovieCommandHandler,
  UpdateMovieByIdCommandHandler,
  DeleteMovieByIdCommandHandler
]

import { MovieDTO } from '@movie/application/dto/movie.dto'

export class UpdateMovieByIdCommand {
  constructor(
    public readonly movieId: string,
    public readonly movie: MovieDTO
  ) {}
}

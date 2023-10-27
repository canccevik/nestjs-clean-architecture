import { MovieDTO } from '@movie/application/dto/movie.dto'

export class CreateMovieCommand {
  constructor(public readonly movie: MovieDTO) {}
}

import { IMovie } from '@movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateMovieCommand } from './create-movie.command'

@CommandHandler(CreateMovieCommand)
export class CreateMovieCommandHandler
  implements ICommandHandler<CreateMovieCommand>
{
  constructor(
    private readonly movieRepository: AbstractMovieRepository<IMovie>
  ) {}

  async execute({ movie }: CreateMovieCommand) {
    const createdMovie = await this.movieRepository.create(movie)
    return { movie: createdMovie }
  }
}

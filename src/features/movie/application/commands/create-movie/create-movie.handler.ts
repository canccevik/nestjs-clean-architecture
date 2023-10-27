import { MovieDocument } from '@movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateMovieCommand } from './create-movie.command'

@CommandHandler(CreateMovieCommand)
export class CreateMovieCommandHandler
  implements ICommandHandler<CreateMovieCommand>
{
  constructor(
    private readonly movieRepository: AbstractMovieRepository<MovieDocument>
  ) {}

  async execute({ movie }: CreateMovieCommand) {
    return this.movieRepository.create(movie)
  }
}

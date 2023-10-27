import { MovieDocument } from '@movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteMovieByIdCommand } from './delete-movie-by-id.command'

@CommandHandler(DeleteMovieByIdCommand)
export class DeleteMovieByIdCommandHandler
  implements ICommandHandler<DeleteMovieByIdCommand>
{
  constructor(
    private readonly movieRepository: AbstractMovieRepository<MovieDocument>
  ) {}

  public async execute({ movieId }: DeleteMovieByIdCommand): Promise<void> {
    await this.movieRepository.findByIdAndDelete(movieId)
  }
}

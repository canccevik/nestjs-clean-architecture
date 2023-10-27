import { MovieDocument } from '@movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateMovieByIdCommand } from './update-movie-by-id.command'

@CommandHandler(UpdateMovieByIdCommand)
export class UpdateMovieByIdCommandHandler
  implements ICommandHandler<UpdateMovieByIdCommand>
{
  constructor(
    private readonly movieRepository: AbstractMovieRepository<MovieDocument>
  ) {}

  public async execute({
    movieId,
    movie
  }: UpdateMovieByIdCommand): Promise<MovieDocument | null> {
    return this.movieRepository.findByIdAndUpdate(movieId, movie)
  }
}

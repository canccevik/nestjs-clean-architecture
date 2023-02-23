import { IMovie } from '@movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetMovieByIdQuery } from './get-movie-by-id.query'

@QueryHandler(GetMovieByIdQuery)
export class GetMovieByIdQueryHandler
  implements IQueryHandler<GetMovieByIdQuery>
{
  constructor(
    private readonly movieRepository: AbstractMovieRepository<IMovie>
  ) {}

  async execute({ movieId }: GetMovieByIdQuery) {
    const movie = await this.movieRepository.findById(movieId)
    return { movie }
  }
}

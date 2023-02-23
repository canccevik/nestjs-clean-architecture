import { IMovie } from '@movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetMoviesQuery } from './get-movies.query'

@QueryHandler(GetMoviesQuery)
export class GetMoviesQueryHandler implements IQueryHandler<GetMoviesQuery> {
  constructor(
    private readonly movieRepository: AbstractMovieRepository<IMovie>
  ) {}

  // eslint-disable-next-line
  async execute(query: GetMoviesQuery) {
    const movies = await this.movieRepository.find({})
    return { movies }
  }
}

import { MovieDocument } from '@movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetMoviesQuery } from './get-movies.query'

@QueryHandler(GetMoviesQuery)
export class GetMoviesQueryHandler implements IQueryHandler<GetMoviesQuery> {
  constructor(
    private readonly movieRepository: AbstractMovieRepository<MovieDocument>
  ) {}

  async execute() {
    return this.movieRepository.find({})
  }
}

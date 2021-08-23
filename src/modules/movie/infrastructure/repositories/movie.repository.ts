import { BaseRepository } from '@common/infrastructure/repositories/base.repository'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Movie, MovieDocument } from '../../domain/models/movie.model'
import { AbstractMovieRepository } from '../../domain/repositories/movie.repository'

@Injectable()
export class MovieRepository
  extends BaseRepository<MovieDocument>
  implements AbstractMovieRepository<MovieDocument>
{
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>
  ) {
    super(movieModel)
  }
}

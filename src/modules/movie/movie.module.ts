import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Movie, MovieSchema } from './domain/models/movie.model'
import { AbstractMovieRepository } from './domain/repositories/movie.repository'
import { MovieRepository } from './infrastructure/repositories/movie.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])
  ],
  providers: [{ provide: AbstractMovieRepository, useClass: MovieRepository }]
})
export class MovieModule {}

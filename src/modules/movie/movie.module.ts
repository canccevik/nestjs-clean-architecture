import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule } from '@nestjs/mongoose'
import { MovieCommandHandlers } from './application/commands'
import { IsMovieExist } from './application/dto/custom-validators/is-movie-exist.validator'
import { MovieQueryHandlers } from './application/queries'
import { Movie, MovieSchema } from './domain/models/movie.model'
import { AbstractMovieRepository } from './domain/repositories/movie.repository'
import { MovieRepository } from './infrastructure/repositories/movie.repository'
import { MovieController } from './presentation/controllers/movie.controller'

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])
  ],
  controllers: [MovieController],
  providers: [
    { provide: AbstractMovieRepository, useClass: MovieRepository },
    IsMovieExist,
    ...MovieCommandHandlers,
    ...MovieQueryHandlers
  ]
})
export class MovieModule {}

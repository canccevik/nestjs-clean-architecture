import { Message } from '@common/infrastructure/decorators/message.decorator'
import { CreateMovieCommand } from '@movie/application/commands/create-movie/create-movie.command'
import { DeleteMovieByIdCommand } from '@movie/application/commands/delete-movie-by-id/delete-movie-by-id.command'
import { UpdateMovieByIdCommand } from '@movie/application/commands/update-movie-by-id/update-movie-by-id.command'
import { MovieIdDTO } from '@movie/application/dto/movie-id.dto'
import { MovieDTO } from '@movie/application/dto/movie.dto'
import { GetMovieByIdQuery } from '@movie/application/queries/get-movie-by-id/get-movie-by-id.query'
import { GetMoviesQuery } from '@movie/application/queries/get-movies/get-movies.query'
import { MovieDocument } from '@movie/domain/models/movie.model'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @Message('Movie created successfully.')
  public async createMovie(
    @Body() createMovieDTO: MovieDTO
  ): Promise<MovieDocument> {
    return this.commandBus.execute(new CreateMovieCommand(createMovieDTO))
  }

  @Get()
  @Message('Movies fetched successfully.')
  public async getMovies(): Promise<MovieDocument[] | null> {
    return this.queryBus.execute(new GetMoviesQuery())
  }

  @Get(':movieId')
  @Message('Movie fetched successfully.')
  public async getMovieById(
    @Param() params: MovieIdDTO
  ): Promise<MovieDocument | null> {
    return this.queryBus.execute(new GetMovieByIdQuery(params.movieId))
  }

  @Put(':movieId')
  @Message('Movie updated successfully.')
  public async updateMovieById(
    @Param() params: MovieIdDTO,
    @Body() updateMovieDTO: MovieDTO
  ): Promise<MovieDocument | null> {
    return this.commandBus.execute(
      new UpdateMovieByIdCommand(params.movieId, updateMovieDTO)
    )
  }

  @Delete(':movieId')
  @Message('Movie deleted successfully.')
  public async deletMovieById(@Param() params: MovieIdDTO): Promise<void> {
    return this.commandBus.execute(new DeleteMovieByIdCommand(params.movieId))
  }
}

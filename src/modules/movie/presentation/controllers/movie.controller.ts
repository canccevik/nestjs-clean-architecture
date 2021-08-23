import { Message } from '@common/infrastructure/decorators/message.decorator'
import { CreateMovieCommand } from '@movie/application/commands/create-movie/create-movie.command'
import { MovieDTO } from '@movie/application/dto/movie.dto'
import { GetMoviesQuery } from '@movie/application/queries/get-movies/get-movies.query'
import { Body, Controller, Get, Post } from '@nestjs/common'
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
  async createMovie(@Body() createMovieDTO: MovieDTO) {
    return this.commandBus.execute(new CreateMovieCommand(createMovieDTO))
  }

  @Get()
  @Message('Movies fetched successfully.')
  async getMovies() {
    return this.queryBus.execute(new GetMoviesQuery())
  }
}

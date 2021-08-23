import { Message } from '@common/infrastructure/decorators/message.decorator'
import { CreateMovieCommand } from '@movie/application/commands/create-movie/create-movie.command'
import { MovieDTO } from '@movie/application/dto/movie.dto'
import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Message('Movie created successfully.')
  async createMovie(@Body() createMovieDTO: MovieDTO) {
    return this.commandBus.execute(new CreateMovieCommand(createMovieDTO))
  }
}

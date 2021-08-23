import { CreateBookDTO } from '@book/application/dto/create-book.dto'
import { BookService } from '@book/application/services/book.service'
import { Message } from '@common/infrastructure/decorators/message.decorator'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Message('Book created successfully.')
  async createBook(@Body() createBookDTO: CreateBookDTO) {
    return this.bookService.createBook(createBookDTO)
  }
}

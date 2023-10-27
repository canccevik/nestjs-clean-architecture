import { BookIdDTO } from '@book/application/dto/book-id.dto'
import { BookDTO } from '@book/application/dto/book.dto'
import { BookService } from '@book/application/services/book.service'
import { Message } from '@common/infrastructure/decorators/message.decorator'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Message('Book created successfully.')
  async createBook(@Body() createBookDTO: BookDTO) {
    return this.bookService.createBook(createBookDTO)
  }

  @Get()
  @Message('Books fetched successfully.')
  async getBooks() {
    return this.bookService.getBooks()
  }

  @Get(':bookId')
  @Message('Book fetched successfully.')
  async getBookById(@Param() params: BookIdDTO) {
    return this.bookService.getBookById(params.bookId)
  }

  @Put(':bookId')
  @Message('Book updated successfully.')
  async updateBook(@Param() params: BookIdDTO, @Body() updateBookDTO: BookDTO) {
    return this.bookService.updateBookById(params.bookId, updateBookDTO)
  }

  @Delete(':bookId')
  @Message('Book deleted successfully.')
  async deleteBook(@Param() params: BookIdDTO) {
    await this.bookService.deleteBookById(params.bookId)
  }
}

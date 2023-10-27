import { BookIdDTO } from '@book/application/dto/book-id.dto'
import { BookDTO } from '@book/application/dto/book.dto'
import { BookService } from '@book/application/services/book.service'
import { BookDocument } from '@book/domain/models/book.model'
import { Message } from '@common/infrastructure/decorators/message.decorator'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Message('Book created successfully.')
  public async createBook(
    @Body() createBookDTO: BookDTO
  ): Promise<BookDocument> {
    return this.bookService.createBook(createBookDTO)
  }

  @Get()
  @Message('Books fetched successfully.')
  public async getBooks(): Promise<BookDocument[]> {
    return this.bookService.getBooks()
  }

  @Get(':bookId')
  @Message('Book fetched successfully.')
  public async getBookById(
    @Param() params: BookIdDTO
  ): Promise<BookDocument | null> {
    return this.bookService.getBookById(params.bookId)
  }

  @Put(':bookId')
  @Message('Book updated successfully.')
  public async updateBook(
    @Param() params: BookIdDTO,
    @Body() updateBookDTO: BookDTO
  ): Promise<BookDocument | null> {
    return this.bookService.updateBookById(params.bookId, updateBookDTO)
  }

  @Delete(':bookId')
  @Message('Book deleted successfully.')
  public async deleteBook(@Param() params: BookIdDTO): Promise<void> {
    await this.bookService.deleteBookById(params.bookId)
  }
}

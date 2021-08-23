import { BookDocument } from '@book/domain/models/book.model'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'
import { Injectable } from '@nestjs/common'
import { CreateBookDTO } from '../dto/create-book.dto'

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: AbstractBookRepository<BookDocument>
  ) {}

  async createBook(book: CreateBookDTO) {
    const createdBook = await this.bookRepository.create(book)
    return { book: createdBook }
  }

  async getBooks() {
    const books = await this.bookRepository.find({})
    return { books }
  }

  async getBookById(bookId: string) {
    const book = await this.bookRepository.findById(bookId)
    return { book }
  }

  async deleteBookById(bookId: string) {
    await this.bookRepository.findByIdAndDelete(bookId)
  }
}

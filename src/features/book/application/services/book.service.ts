import { IBook } from '@book/domain/models/book.model'
import { Injectable } from '@nestjs/common'
import { BookDTO } from '../dto/book.dto'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: AbstractBookRepository<IBook>) {}

  async createBook(book: BookDTO) {
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

  async updateBookById(bookId: string, book: BookDTO) {
    const updatedBook = await this.bookRepository.findByIdAndUpdate(
      bookId,
      book
    )
    return { book: updatedBook }
  }

  async deleteBookById(bookId: string) {
    await this.bookRepository.findByIdAndDelete(bookId)
  }
}

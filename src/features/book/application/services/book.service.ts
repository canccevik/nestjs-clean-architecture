import { IBook } from '@book/domain/models/book.model'
import { Injectable } from '@nestjs/common'
import { BookDTO } from '../dto/book.dto'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: AbstractBookRepository<IBook>) {}

  async createBook(book: BookDTO) {
    return this.bookRepository.create(book)
  }

  async getBooks() {
    return this.bookRepository.find({})
  }

  async getBookById(bookId: string) {
    return this.bookRepository.findById(bookId)
  }

  async updateBookById(bookId: string, book: BookDTO) {
    return this.bookRepository.findByIdAndUpdate(bookId, book)
  }

  async deleteBookById(bookId: string) {
    await this.bookRepository.findByIdAndDelete(bookId)
  }
}

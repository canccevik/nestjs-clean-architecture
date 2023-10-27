import { BookDocument } from '@book/domain/models/book.model'
import { Injectable } from '@nestjs/common'
import { BookDTO } from '../dto/book.dto'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: AbstractBookRepository<BookDocument>
  ) {}

  public async createBook(book: BookDTO): Promise<BookDocument> {
    return this.bookRepository.create(book)
  }

  public async getBooks(): Promise<BookDocument[]> {
    return this.bookRepository.find({})
  }

  public async getBookById(bookId: string): Promise<BookDocument | null> {
    return this.bookRepository.findById(bookId)
  }

  public async updateBookById(
    bookId: string,
    book: BookDTO
  ): Promise<BookDocument | null> {
    return this.bookRepository.findByIdAndUpdate(bookId, book)
  }

  public async deleteBookById(bookId: string): Promise<void> {
    await this.bookRepository.findByIdAndDelete(bookId)
  }
}

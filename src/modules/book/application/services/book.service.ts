import { BookDocument } from '@book/domain/models/book.model'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: AbstractBookRepository<BookDocument>
  ) {}
}

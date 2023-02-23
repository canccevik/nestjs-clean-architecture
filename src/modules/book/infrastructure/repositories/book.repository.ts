import { Book, IBook } from '@book/domain/models/book.model'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'
import { BaseRepository } from '@common/infrastructure/repositories/base.repository'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class BookRepository
  extends BaseRepository<IBook>
  implements AbstractBookRepository<IBook>
{
  constructor(@InjectModel(Book.name) private bookModel: Model<IBook>) {
    super(bookModel)
  }
}

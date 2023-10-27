import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { IsBookExist } from './application/dto/custom-validators/is-book-exist.validator'
import { BookService } from './application/services/book.service'
import { Book, BookSchema } from './domain/models/book.model'
import { AbstractBookRepository } from './domain/repositories/book.repository'
import { BookRepository } from './infrastructure/repositories/book.repository'
import { BookController } from './presentation/controllers/book.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])
  ],
  controllers: [BookController],
  providers: [
    { provide: AbstractBookRepository, useClass: BookRepository },
    BookService,
    IsBookExist
  ]
})
export class BookModule {}

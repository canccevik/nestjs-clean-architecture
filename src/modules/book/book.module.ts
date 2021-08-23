import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BookService } from './application/services/book.service'
import { Book, BookSchema } from './domain/models/book.model'
import { AbstractBookRepository } from './domain/repositories/book.repository'
import { BookRepository } from './infrastructure/repositories/book.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])
  ],
  providers: [
    BookService,
    { provide: AbstractBookRepository, useClass: BookRepository }
  ]
})
export class BookModule {}

import { IsDocumentExist } from '@common/application/dto/custom-validators/is-document-exist.validator'
import { AbstractBaseRepository } from '@common/domain/repositories/base.repository'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
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
    BookService,
    { provide: AbstractBookRepository, useClass: BookRepository },
    IsDocumentExist,
    { provide: AbstractBaseRepository, useClass: BookRepository }
  ]
})
export class BookModule {}

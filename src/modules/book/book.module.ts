import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Book, BookSchema } from './domain/models/book.model'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])
  ]
})
export class BookModule {}

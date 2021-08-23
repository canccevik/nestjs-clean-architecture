import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BookCategory } from '../enums/book-category.enum'

export type BookDocument = Book & Document

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: false
  }
})
export class Book {
  @Prop({
    type: String,
    required: true,
    minlength: [2, 'Book name must be longer than 2 characters.'],
    maxlength: [30, 'Book name must be shorter than 30 characters.']
  })
  name!: string

  @Prop({
    type: String,
    required: true,
    enum: BookCategory
  })
  category!: string

  @Prop({
    type: String,
    required: true,
    minlength: [2, 'Author name must be longer than 2 characters.'],
    maxlength: [30, 'Author name must be shorter than 30 characters.']
  })
  author!: string
}

export const BookSchema = SchemaFactory.createForClass(Book)

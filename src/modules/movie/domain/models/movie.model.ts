import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { MovieCategory } from '../enums/movie-category.enum'

export type MovieDocument = Movie & Document

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: false
  }
})
export class Movie {
  @Prop({
    type: String,
    required: true,
    minlength: [2, 'Movie name must be longer than 2 characters.'],
    maxlength: [30, 'Movie name must be shorter than 30 characters.']
  })
  name!: string

  @Prop({
    type: String,
    required: true,
    enum: MovieCategory
  })
  category!: string

  @Prop({
    type: String,
    required: true,
    minlength: [2, 'Director name must be longer than 2 characters.'],
    maxlength: [30, 'Director name must be shorter than 30 characters.']
  })
  director!: string
}

export const MovieSchema = SchemaFactory.createForClass(Movie)

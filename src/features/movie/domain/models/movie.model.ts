import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { MovieCategory } from '../enums/movie-category.enum'
import { HydratedDocument } from 'mongoose'

export type MovieDocument = HydratedDocument<Movie>

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
  public name!: string

  @Prop({
    type: String,
    required: true,
    enum: MovieCategory
  })
  public category!: string

  @Prop({
    type: String,
    required: true,
    minlength: [2, 'Director name must be longer than 2 characters.'],
    maxlength: [30, 'Director name must be shorter than 30 characters.']
  })
  public director!: string
}

export const MovieSchema = SchemaFactory.createForClass(Movie)

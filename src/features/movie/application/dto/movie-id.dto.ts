import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, Validate } from 'class-validator'
import { IsMovieExist } from './custom-validators/is-movie-exist.validator'

export class MovieIdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  @Validate(IsMovieExist)
  public movieId!: string
}

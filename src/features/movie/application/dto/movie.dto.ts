import { MovieCategory } from '@movie/domain/enums/movie-category.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, Length } from 'class-validator'

export class MovieDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 30)
  public name!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MovieCategory)
  public category!: string

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 30)
  public director!: string
}

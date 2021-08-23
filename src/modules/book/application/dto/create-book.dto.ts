import { BookCategory } from '@book/domain/enums/book-category.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, Length } from 'class-validator'

export class CreateBookDTO {
  @ApiProperty()
  @Length(2, 30)
  name!: string

  @ApiProperty()
  @IsEnum(BookCategory)
  category!: string

  @ApiProperty()
  @Length(2, 30)
  author!: string
}

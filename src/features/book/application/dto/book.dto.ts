import { BookCategory } from '@book/domain/enums/book-category.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, Length } from 'class-validator'

export class BookDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 30)
  name!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BookCategory)
  category!: string

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 30)
  author!: string
}

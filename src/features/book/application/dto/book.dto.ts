import { BookCategory } from '@book/domain/enums/book-category.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, Length } from 'class-validator'

export class BookDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 30)
  public name!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BookCategory)
  public category!: string

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 30)
  public author!: string
}

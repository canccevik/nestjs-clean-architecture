import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty } from 'class-validator'

export class BookIdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  bookId!: string
}

import { IsDocumentExist } from '@common/application/dto/custom-validators/is-document-exist.validator'
import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, Validate } from 'class-validator'

export class BookIdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  @Validate(IsDocumentExist, ['book'])
  bookId!: string
}

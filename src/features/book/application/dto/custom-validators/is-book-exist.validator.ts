import { BookDocument } from '@book/domain/models/book.model'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'
import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsBookExist {
  constructor(
    private readonly repository: AbstractBookRepository<BookDocument>
  ) {}

  public async validate(
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args: ValidationArguments
  ): Promise<BookDocument | null> {
    return this.repository.findById(id)
  }

  public defaultMessage(): string {
    return 'book cannot found'
  }
}

import { IBook } from '@book/domain/models/book.model'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'
import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsBookExist {
  constructor(private readonly repository: AbstractBookRepository<IBook>) {}

  // eslint-disable-next-line
  async validate(id: string, args: ValidationArguments) {
    return this.repository.findById(id)
  }

  // eslint-disable-next-line
  defaultMessage(args: ValidationArguments) {
    return 'book cannot found'
  }
}

import { AbstractBaseRepository } from '@common/domain/repositories/base.repository'
import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsDocumentExist {
  constructor(private readonly repository: AbstractBaseRepository<Document>) {}

  // eslint-disable-next-line
  async validate(id: string, args: ValidationArguments) {
    return await this.repository.findById(id)
  }

  defaultMessage(args: ValidationArguments) {
    const documentName = args.constraints[0]
    return `${documentName} cannot found`
  }
}

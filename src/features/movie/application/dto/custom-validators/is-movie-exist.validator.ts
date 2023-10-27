import { IMovie } from '@movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsMovieExist {
  constructor(private readonly repository: AbstractMovieRepository<IMovie>) {}

  // eslint-disable-next-line
  async validate(id: string, args: ValidationArguments) {
    return this.repository.findById(id)
  }

  // eslint-disable-next-line
  defaultMessage(args: ValidationArguments) {
    return 'movie cannot found'
  }
}

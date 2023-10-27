/* eslint-disable @typescript-eslint/no-unused-vars */
import { MovieDocument } from '@movie/domain/models/movie.model'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsMovieExist {
  constructor(
    private readonly repository: AbstractMovieRepository<MovieDocument>
  ) {}

  public async validate(
    id: string,
    args: ValidationArguments
  ): Promise<MovieDocument | null> {
    return this.repository.findById(id)
  }

  public defaultMessage(): string {
    return 'movie cannot found'
  }
}

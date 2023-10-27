import { Injectable } from '@nestjs/common'
import {
  FilterQuery,
  UpdateQuery,
  UpdateWithAggregationPipeline
} from 'mongoose'
import {
  CreateResult,
  DeleteResult,
  FindAllResult,
  FindResult,
  UpdateResult
} from './types/query.types'

@Injectable()
export abstract class AbstractBaseRepository<T> {
  abstract create(object: Partial<T>): Promise<CreateResult<T>>

  abstract find(query: FilterQuery<T>): FindAllResult<T>

  abstract findById(id: string): FindResult<T>

  abstract findByIdAndDelete(id: string): FindResult<T>

  abstract findByIdAndUpdate(
    id: string,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): FindResult<T>

  abstract findOne(query: FilterQuery<T>): FindResult<T>

  abstract findOneAndDelete(query: FilterQuery<T>): FindResult<T>

  abstract findOneAndUpdate(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): FindResult<T>

  abstract updateMany(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): UpdateResult<T>

  abstract updateOne(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): UpdateResult<T>

  abstract deleteMany(query: FilterQuery<T>): DeleteResult<T>

  abstract deleteOne(query: FilterQuery<T>): DeleteResult<T>
}

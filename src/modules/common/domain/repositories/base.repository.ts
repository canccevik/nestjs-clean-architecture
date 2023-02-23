import { Injectable } from '@nestjs/common'
import {
  FilterQuery,
  HydratedDocument,
  UpdateQuery,
  UpdateWithAggregationPipeline
} from 'mongoose'
import {
  DeleteResult,
  FindAllResult,
  FindResult,
  UpdateResult
} from './types/query.types'

@Injectable()
export abstract class AbstractBaseRepository<T> {
  abstract create(object: T): Promise<HydratedDocument<T, unknown>>

  abstract find(query: FilterQuery<T>): Promise<FindAllResult<T>>

  abstract findById(id: string): Promise<FindResult<T>>

  abstract findByIdAndDelete(id: string): Promise<FindResult<T>>

  abstract findByIdAndUpdate(
    id: string,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): Promise<FindResult<T>>

  abstract findOne(query: FilterQuery<T>): Promise<FindResult<T>>

  abstract findOneAndDelete(query: FilterQuery<T>): Promise<FindResult<T>>

  abstract findOneAndUpdate(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): Promise<FindResult<T>>

  abstract updateMany(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): Promise<UpdateResult<T>>

  abstract updateOne(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): Promise<UpdateResult<T>>

  abstract deleteMany(query: FilterQuery<T>): Promise<DeleteResult<T>>

  abstract deleteOne(query: FilterQuery<T>): Promise<DeleteResult<T>>
}

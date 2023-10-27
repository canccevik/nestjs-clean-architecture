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
  public abstract create(object: Partial<T>): Promise<CreateResult<T>>

  public abstract find(query: FilterQuery<T>): FindAllResult<T>

  public abstract findById(id: string): FindResult<T>

  public abstract findByIdAndDelete(id: string): FindResult<T>

  public abstract findByIdAndUpdate(
    id: string,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): FindResult<T>

  public abstract findOne(query: FilterQuery<T>): FindResult<T>

  public abstract findOneAndDelete(query: FilterQuery<T>): FindResult<T>

  public abstract findOneAndUpdate(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): FindResult<T>

  public abstract updateMany(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): UpdateResult<T>

  public abstract updateOne(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): UpdateResult<T>

  public abstract deleteMany(query: FilterQuery<T>): DeleteResult<T>

  public abstract deleteOne(query: FilterQuery<T>): DeleteResult<T>
}

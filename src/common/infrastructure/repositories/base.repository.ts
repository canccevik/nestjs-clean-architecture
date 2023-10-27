import { AbstractBaseRepository } from '@common/domain/repositories/base.repository'
import {
  CreateResult,
  DeleteResult,
  FindAllResult,
  FindResult,
  UpdateResult
} from '@common/domain/repositories/types/query.types'
import { Injectable } from '@nestjs/common'
import {
  FilterQuery,
  Model,
  UpdateQuery,
  UpdateWithAggregationPipeline
} from 'mongoose'

@Injectable()
export class BaseRepository<T> extends AbstractBaseRepository<T> {
  constructor(private readonly model: Model<T>) {
    super()
  }

  public async create(object: Partial<T>): Promise<CreateResult<T>> {
    return this.model.create(object)
  }

  public find(query: FilterQuery<T>): FindAllResult<T> {
    return this.model.find(query)
  }

  public findById(id: string): FindResult<T> {
    return this.model.findById(id)
  }

  public findByIdAndDelete(id: string): FindResult<T> {
    return this.model.findByIdAndRemove(id)
  }

  public findByIdAndUpdate(
    id: string,
    update: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): FindResult<T> {
    return this.model.findByIdAndUpdate(id, update, { new: true })
  }

  public findOne(filter: FilterQuery<T>): FindResult<T> {
    return this.model.findOne(filter)
  }

  public findOneAndDelete(filter: FilterQuery<T>): FindResult<T> {
    return this.model.findOneAndDelete(filter)
  }

  public findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): FindResult<T> {
    return this.model.findOneAndUpdate(filter, update, { new: true })
  }

  public updateMany(
    filter: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): UpdateResult<T> {
    return this.model.updateMany(filter, object, { new: true })
  }

  public updateOne(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): UpdateResult<T> {
    return this.model.updateOne(query, object)
  }

  public deleteMany(filter: FilterQuery<T>): DeleteResult<T> {
    return this.model.deleteMany(filter)
  }

  public deleteOne(filter: FilterQuery<T>): DeleteResult<T> {
    return this.model.deleteOne(filter)
  }
}

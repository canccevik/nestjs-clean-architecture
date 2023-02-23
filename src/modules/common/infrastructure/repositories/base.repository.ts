import { AbstractBaseRepository } from '@common/domain/repositories/base.repository'
import {
  DeleteResult,
  FindAllResult,
  FindResult,
  UpdateResult
} from '@common/domain/repositories/types/query.types'
import { Injectable } from '@nestjs/common'
import {
  FilterQuery,
  HydratedDocument,
  Model,
  UpdateQuery,
  UpdateWithAggregationPipeline
} from 'mongoose'

@Injectable()
export class BaseRepository<T> extends AbstractBaseRepository<T> {
  constructor(private readonly model: Model<T>) {
    super()
  }

  async create(object: T): Promise<HydratedDocument<T, unknown>> {
    return this.model.create(object)
  }

  async find(query: FilterQuery<T>): Promise<FindAllResult<T>> {
    return this.model.find(query)
  }

  async findById(id: string): Promise<FindResult<T>> {
    return this.model.findById(id)
  }

  async findByIdAndDelete(id: string): Promise<FindResult<T>> {
    return this.model.findByIdAndRemove(id)
  }

  async findByIdAndUpdate(
    id: string,
    update: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): Promise<FindResult<T>> {
    return this.model.findByIdAndUpdate(id, update, { new: true })
  }

  async findOne(filter: FilterQuery<T>): Promise<FindResult<T>> {
    return this.model.findOne(filter)
  }

  async findOneAndDelete(filter: FilterQuery<T>): Promise<FindResult<T>> {
    return this.model.findOneAndDelete(filter)
  }

  async findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): Promise<FindResult<T>> {
    return this.model.findOneAndUpdate(filter, update, { new: true })
  }

  async updateMany(
    filter: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): Promise<UpdateResult<T>> {
    return this.model.updateMany(filter, object, { new: true })
  }

  async updateOne(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): Promise<UpdateResult<T>> {
    return this.model.updateOne(query, object)
  }

  async deleteMany(filter: FilterQuery<T>): Promise<DeleteResult<T>> {
    return this.model.deleteMany(filter)
  }

  async deleteOne(filter: FilterQuery<T>): Promise<DeleteResult<T>> {
    return this.model.deleteOne(filter)
  }
}

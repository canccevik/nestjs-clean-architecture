import { AbstractBaseRepository } from '@common/domain/repositories/base.repository'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class BaseRepository<Document> extends AbstractBaseRepository<Document> {
  constructor(private readonly model: Model<Document>) {
    super()
  }

  create(object: any) {
    return this.model.create(object)
  }

  find(query: any) {
    return this.model.find(query)
  }

  findById(id: string) {
    return this.model.findById(id)
  }

  findByIdAndDelete(id: string) {
    return this.model.findByIdAndDelete(id)
  }

  findByIdAndUpdate(id: string, object: any) {
    return this.model.findByIdAndUpdate(id, object, { new: true })
  }

  findOne(query: any) {
    return this.model.findOne(query)
  }

  findOneAndDelete(query: any) {
    return this.model.findOneAndDelete(query)
  }

  findOneAndUpdate(query: any, object: any) {
    return this.model.findOneAndUpdate(query, object, { new: true })
  }

  updateMany(query: any, object: any) {
    return this.model.updateMany(query, object)
  }

  updateOne(query: any, object: any) {
    return this.model.updateOne(query, object)
  }

  deleteMany(query: any) {
    return this.model.deleteMany(query)
  }

  deleteOne(query: any) {
    return this.model.deleteOne(query)
  }
}

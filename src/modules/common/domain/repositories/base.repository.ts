import { Injectable } from '@nestjs/common'
import {
  QueryResults,
  QueryResult,
  UpdateWriteQueryResult,
  DeleteQueryResult
} from './types/query.types'

@Injectable()
export abstract class AbstractBaseRepository<Document> {
  abstract create(object: any): Promise<Document>

  abstract find(query: any): QueryResults<Document>

  abstract findById(id: string): QueryResult<Document>

  abstract findByIdAndDelete(id: string): QueryResult<Document>

  abstract findByIdAndUpdate(id: string, object: any): QueryResult<Document>

  abstract findOne(query: any): QueryResult<Document>

  abstract findOneAndDelete(query: any): QueryResult<Document>

  abstract findOneAndUpdate(query: any, object: any): QueryResult<Document>

  abstract updateMany(query: any, object: any): UpdateWriteQueryResult<Document>

  abstract updateOne(query: any, object: any): UpdateWriteQueryResult<Document>

  abstract deleteMany(query: any): DeleteQueryResult<Document>

  abstract deleteOne(query: any): DeleteQueryResult<Document>
}

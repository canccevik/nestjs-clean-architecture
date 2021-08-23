import { EnforceDocument, Query, UpdateWriteOpResult } from 'mongoose'

export type QueryResults<Document> = Query<
  EnforceDocument<Document, any>[],
  EnforceDocument<Document, any>,
  any,
  Document
>

export type QueryResult<Document> = Query<
  EnforceDocument<Document, any> | null,
  any
>

export type UpdateWriteQueryResult<Document> = Query<
  UpdateWriteOpResult,
  EnforceDocument<Document, any>,
  any,
  Document
>

export type DeleteQueryResult<Document> = Query<
  { ok?: number | undefined; n?: number | undefined } & {
    deletedCount?: number | undefined
  },
  EnforceDocument<Document, any>,
  any,
  Document
>

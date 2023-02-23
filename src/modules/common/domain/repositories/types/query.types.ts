import { HydratedDocument, Query, UpdateWriteOpResult } from 'mongoose'

export type FindAllResult<T> = Query<
  HydratedDocument<T, unknown>[],
  HydratedDocument<T, unknown>
>

export type FindResult<T> = Query<
  HydratedDocument<T, unknown> | null,
  HydratedDocument<T, unknown>,
  unknown,
  T
>

export type UpdateResult<T> = Query<
  UpdateWriteOpResult,
  HydratedDocument<T, unknown>,
  unknown,
  T
>

export type DeleteResult<T> = Query<
  { ok?: number | undefined; n?: number | undefined } & {
    deletedCount?: number | undefined
  },
  HydratedDocument<T, unknown>,
  unknown,
  T
>

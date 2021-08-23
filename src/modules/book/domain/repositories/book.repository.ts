import { AbstractBaseRepository } from '@common/domain/repositories/base.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class AbstractBookRepository<
  Document
> extends AbstractBaseRepository<Document> {}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Reflector } from '@nestjs/core'
import { Response } from 'express'
import { Message } from '@common/infrastructure/decorators/message.decorator'

export interface Payload<T> {
  payload: T
  statusCode: number
  message: string
}

@Injectable()
export class ResponseMappingInterceptor<T>
  implements NestInterceptor<T, Payload<T>>
{
  constructor(private readonly reflector: Reflector) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Payload<T>> {
    return next
      .handle()
      .pipe(map((payload) => this.transformResponse(payload, context)))
  }

  public transformResponse<T>(
    payload: T,
    context: ExecutionContext
  ): Payload<T> {
    const handler = context.getHandler()
    const message = this.reflector.get(Message, handler)
    const { statusCode } = context.switchToHttp().getResponse<Response>()

    return { message, statusCode, payload }
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Reflector } from '@nestjs/core'

export interface Response<T> {
  payload: T
}

@Injectable()
export class ResponseMappingInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const target = context.getHandler()
    const message = this.reflector.get('message', target)

    return next.handle().pipe(map((payload) => ({ message, payload })))
  }
}

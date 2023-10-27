import { Request, Response } from 'express'
import { Observable, tap } from 'rxjs'
import { Logger } from 'nestjs-pino'
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor
} from '@nestjs/common'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    const { method, url } = context.switchToHttp().getRequest<Request>()
    const message = `Incoming request - ${method} - ${url}`

    this.logger.log(message)

    return next.handle().pipe(
      tap({
        next: () => this.logSuccess(context),
        error: (error) => this.logError(error, context)
      })
    )
  }

  private logSuccess(context: ExecutionContext): void {
    const { method, url } = context.switchToHttp().getRequest<Request>()
    const { statusCode } = context.switchToHttp().getResponse<Response>()
    const message = `Outgoing response - ${statusCode} - ${method} - ${url}`

    this.logger.log(message)
  }

  private logError(error: Error, context: ExecutionContext): void {
    const { method, url } = context.switchToHttp().getRequest<Request>()

    if (!(error instanceof HttpException)) {
      const message = `Outgoing response - ${method} - ${url}`
      return this.logger.error(message, error.stack)
    }

    const statusCode = error.getStatus()
    const message = `Outgoing response - ${statusCode} - ${method} - ${url}`

    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      return this.logger.error(message, error.stack)
    }
    this.logger.warn(message, error)
  }
}

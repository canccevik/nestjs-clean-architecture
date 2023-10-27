import { Response } from 'express'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException
} from '@nestjs/common'

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  public catch(exception: T, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<Response>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const response =
      exception instanceof HttpException
        ? exception.getResponse()
        : new InternalServerErrorException().getResponse()

    res.status(status).json(response)
  }
}

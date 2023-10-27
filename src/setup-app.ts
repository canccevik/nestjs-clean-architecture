import { HttpExceptionFilter } from '@common/infrastructure/rest/filters/http-exception.filter'
import { ResponseMappingInterceptor } from '@common/infrastructure/rest/interceptors/response-mapping.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { useContainer } from 'class-validator'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import { AppModule } from './modules/app.module'

export function setupApp(app: NestExpressApplication): void {
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const configService = app.get<ConfigService>(ConfigService)

  const globalPrefix = configService.get('globalPrefix')

  app.setGlobalPrefix(globalPrefix)

  app.enableCors()

  app.use(helmet())
  app.use(compression())
  app.use(morgan('tiny'))

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseMappingInterceptor(new Reflector()))
}

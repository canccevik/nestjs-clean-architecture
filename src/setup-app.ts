import { HttpExceptionFilter } from '@common/infrastructure/rest/filters/http-exception.filter'
import { ResponseMappingInterceptor } from '@common/infrastructure/rest/interceptors/response-mapping.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { useContainer } from 'class-validator'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import { AppModule } from './modules/app.module'
import { Config, ENV } from '@common/infrastructure/configurations/index.config'

export function setupApp(app: NestExpressApplication): void {
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const config = app.get<Config>(ENV)

  app.setGlobalPrefix(config.GLOBAL_PREFIX)

  app.enableCors()

  app.use(helmet())
  app.use(compression())
  app.use(morgan('tiny'))

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseMappingInterceptor(new Reflector()))
}
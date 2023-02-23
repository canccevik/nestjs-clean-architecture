import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './modules/app.module'
import { HttpExceptionFilter } from '@common/infrastructure/rest/filters/http-exception.filter'
import { ValidationPipe } from '@common/infrastructure/rest/pipes/validation.pipe'
import { ResponseMappingInterceptor } from '@common/infrastructure/rest/interceptors/response-mapping.interceptor'
import { useContainer } from 'class-validator'

import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { setupSwagger } from './setup-swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  })

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const configService = app.get<ConfigService>(ConfigService)

  const globalPrefix = configService.get('globalPrefix')

  app.setGlobalPrefix(globalPrefix)

  app.use(helmet())
  app.use(compression())
  app.use(morgan('tiny'))

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseMappingInterceptor(new Reflector()))

  setupSwagger(app)

  const port = configService.get('port')
  await app.listen(port)
}
bootstrap()

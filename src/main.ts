import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './modules/app.module'
import { HttpExceptionFilter } from '@common/infrastructure/rest/filters/http-exception.filter'
import { ValidationPipe } from '@common/infrastructure/rest/pipes/validation.pipe'
import { ResponseMappingInterceptor } from '@common/infrastructure/rest/interceptors/response-mapping.interceptor'
import { useContainer } from 'class-validator'

import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'

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

  const appName = configService.get('appName')
  const appDescription = configService.get('appDescription')
  const apiVersion = configService.get('apiVersion')

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appDescription)
    .setVersion(apiVersion)
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/', app, document)
  SwaggerModule.setup(globalPrefix, app, document)

  const port = configService.get('port')
  await app.listen(port)
}
bootstrap()

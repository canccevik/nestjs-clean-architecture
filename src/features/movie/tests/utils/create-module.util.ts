import { HttpExceptionFilter } from '@common/infrastructure/rest/filters/http-exception.filter'
import { ResponseMappingInterceptor } from '@common/infrastructure/rest/interceptors/response-mapping.interceptor'
import { ValidationPipe } from '@common/infrastructure/rest/pipes/validation.pipe'
import { MovieModule } from '@movie/movie.module'
import { Reflector } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { useContainer } from 'class-validator'
import { MongoMemoryServer } from 'mongodb-memory-server'

export const createModule = async () => {
  const module = await Test.createTestingModule({
    imports: [
      MovieModule,
      MongooseModule.forRootAsync({
        useFactory: async () => ({
          uri: (await MongoMemoryServer.create()).getUri()
        })
      })
    ]
  }).compile()

  const app = module.createNestApplication()

  useContainer(app, { fallbackOnErrors: true })

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseMappingInterceptor(new Reflector()))

  await app.init()
  return { app, module }
}

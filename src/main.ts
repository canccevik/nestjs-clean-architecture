import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './modules/app.module'
import { setupSwagger } from './setup-swagger'
import { setupApp } from './setup-app'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get<ConfigService>(ConfigService)

  setupApp(app)
  setupSwagger(app)

  const port = configService.get('port')
  await app.listen(port)
}
bootstrap()

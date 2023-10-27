import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './modules/app.module'
import { setupSwagger } from './setup-swagger'
import { setupApp } from './setup-app'
import { Config, ENV } from '@common/infrastructure/configurations/index.config'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const config = app.get<Config>(ENV)

  setupApp(app)
  setupSwagger(app)

  await app.listen(config.PORT)
}
bootstrap()

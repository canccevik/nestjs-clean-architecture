import { Config, ENV } from '@common/infrastructure/configurations/index.config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: NestExpressApplication): void {
  const config = app.get<Config>(ENV)

  const documentConfig = new DocumentBuilder()
    .setTitle(config.APP_NAME)
    .setDescription(config.APP_DESCRIPTION)
    .setVersion(config.API_VERSION)
    .build()

  const document = SwaggerModule.createDocument(app, documentConfig)

  SwaggerModule.setup('/', app, document)
  SwaggerModule.setup(config.GLOBAL_PREFIX, app, document)
}

import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: NestExpressApplication): void {
  const configService = app.get<ConfigService>(ConfigService)

  const globalPrefix = configService.get('globalPrefix')
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
}

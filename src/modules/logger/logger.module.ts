import { Config, ENV } from '@common/infrastructure/configurations/index.config'
import { Module } from '@nestjs/common'
import { LoggerModule as PinoModule } from 'nestjs-pino'

@Module({
  imports: [
    PinoModule.forRootAsync({
      useFactory: (config: Config) => {
        const targets = [
          {
            target: 'pino-pretty',
            level: 'info',
            options: {}
          }
        ]

        if (config.isProd && config.LOGTAIL_SOURCE_TOKEN) {
          targets.push({
            target: '@logtail/pino',
            level: 'info',
            options: {
              sourceToken: config.LOGTAIL_SOURCE_TOKEN
            }
          })
        }
        return {
          pinoHttp: {
            autoLogging: false,
            transport: { targets }
          }
        }
      },
      inject: [ENV]
    })
  ]
})
export class LoggerModule {}

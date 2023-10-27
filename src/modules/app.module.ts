import {
  Config,
  ENV,
  validators
} from '@common/infrastructure/configurations/index.config'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { EnvalidModule } from 'nestjs-envalid'
import { FeaturesModule } from 'src/features/features.module'

@Module({
  imports: [
    FeaturesModule,
    EnvalidModule.forRoot({
      validators,
      isGlobal: true,
      useDotenv: true
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: Config) => ({
        uri: config.DATABASE_URI
      }),
      inject: [ENV]
    })
  ]
})
export class AppModule {}

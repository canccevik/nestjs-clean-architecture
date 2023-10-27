import { validators } from '@common/infrastructure/configurations/index.config'
import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { FeaturesModule } from 'src/features/features.module'
import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './logger/logger.module'

@Module({
  imports: [
    FeaturesModule,
    EnvalidModule.forRoot({
      validators,
      isGlobal: true,
      useDotenv: true
    }),
    DatabaseModule,
    LoggerModule
  ]
})
export class AppModule {}

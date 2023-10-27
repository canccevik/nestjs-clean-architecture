import { Module } from '@nestjs/common'
import { DatabaseConfigService } from './database-config.service'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DatabaseConfigService
    })
  ]
})
export class DatabaseModule {}

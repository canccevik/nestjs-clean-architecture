import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { config } from '@common/infrastructure/configurations/index.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    })
  ]
})
export class AppModule {}

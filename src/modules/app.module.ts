import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { config } from '@common/infrastructure/configurations/index.config'
import { MongooseModule } from '@nestjs/mongoose'
import { BookModule } from '@book/book.module'
import { MovieModule } from './movie/movie.module'

@Module({
  imports: [
    MovieModule,
    BookModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('databaseURI')
      }),
      inject: [ConfigService]
    })
  ]
})
export class AppModule {}

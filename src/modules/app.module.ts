import {
  Config,
  ENV,
  validators
} from '@common/infrastructure/configurations/index.config'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BookModule } from '@book/book.module'
import { MovieModule } from './movie/movie.module'
import { EnvalidModule } from 'nestjs-envalid'

@Module({
  imports: [
    MovieModule,
    BookModule,
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

import { BookModule } from '@book/book.module'
import { MovieModule } from '@movie/movie.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [BookModule, MovieModule]
})
export class FeaturesModule {}

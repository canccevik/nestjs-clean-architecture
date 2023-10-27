import supertest, { SuperTest } from 'supertest'
import { createModule } from './utils/create-module.util'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { IMovie } from '@movie/domain/models/movie.model'

describe('Movie Controller - [DELETE] /movies/:movieId', () => {
  let nestApp: INestApplication
  let movieRepository: AbstractMovieRepository<IMovie>
  let request: SuperTest<any>

  beforeAll(async () => {
    const { app, module } = await createModule()
    nestApp = app
    movieRepository = module.get<AbstractMovieRepository<IMovie>>(
      AbstractMovieRepository
    )
    request = supertest(app.getHttpServer())
  })

  it('should delete the movie by id', async () => {
    const movie = {
      name: 'Batman Begins',
      category: 'ACTION',
      director: 'Christopher Nolan'
    }

    const createdMovieResponse = await request
      .post('/movies')
      .send(movie)
      .expect(HttpStatus.CREATED)

    const createdMovie = createdMovieResponse.body.payload.movie

    await request.delete(`/movies/${createdMovie._id}`).expect(HttpStatus.OK)
  })

  afterEach(async () => {
    await movieRepository.deleteMany({})
  })

  afterAll(async () => {
    await nestApp.close()
  })
})
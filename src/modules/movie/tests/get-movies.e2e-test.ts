import supertest, { SuperTest } from 'supertest'
import { createModule } from './create-module'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AbstractMovieRepository } from '@movie/domain/repositories/movie.repository'
import { MovieDocument } from '@movie/domain/models/movie.model'

describe('Movie Controller - [GET] /movies', () => {
  let nestApp: INestApplication
  let movieRepository: AbstractMovieRepository<MovieDocument>
  let request: SuperTest<any>

  beforeAll(async () => {
    const { app, module } = await createModule()
    nestApp = app
    movieRepository = module.get<AbstractMovieRepository<MovieDocument>>(
      AbstractMovieRepository
    )
    request = supertest(app.getHttpServer())
  })

  it('should get all movies', async () => {
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

    const fetchedMovies = await request.get('/movies').expect(HttpStatus.OK)

    const movies = fetchedMovies.body.payload.movies

    expect(movies).toEqual([
      {
        _id: createdMovie._id,
        name: movie.name,
        category: movie.category,
        director: movie.director,
        createdAt: createdMovie.createdAt
      }
    ])
  })

  afterEach(async () => {
    await movieRepository.deleteMany({})
  })

  afterAll(async () => {
    await nestApp.close()
  })
})

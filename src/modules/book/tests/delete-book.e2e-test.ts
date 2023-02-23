import supertest, { SuperTest } from 'supertest'
import { createModule } from './utils/create-module.util'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'
import { IBook } from '@book/domain/models/book.model'

describe('Book Controller - [DELETE] /books/:bookId', () => {
  let nestApp: INestApplication
  let bookRepository: AbstractBookRepository<IBook>
  let request: SuperTest<any>

  beforeAll(async () => {
    const { app, module } = await createModule()
    nestApp = app
    bookRepository = module.get<AbstractBookRepository<IBook>>(
      AbstractBookRepository
    )
    request = supertest(app.getHttpServer())
  })

  it('should delete the book by id', async () => {
    const book = {
      name: 'The End of Everything',
      category: 'SCIENCE',
      author: 'Katie Mack'
    }

    const createdBookResponse = await request
      .post('/books')
      .send(book)
      .expect(HttpStatus.CREATED)

    const createdBook = createdBookResponse.body.payload.book

    await request.delete(`/books/${createdBook._id}`).expect(200)
  })

  afterEach(async () => {
    await bookRepository.deleteMany({})
  })

  afterAll(async () => {
    await nestApp.close()
  })
})

import supertest, { SuperTest } from 'supertest'
import { createModule } from './create-module'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'
import { BookDocument } from '@book/domain/models/book.model'

describe('Book Controller - [POST] /books', () => {
  let nestApp: INestApplication
  let bookRepository: AbstractBookRepository<BookDocument>
  let request: SuperTest<any>

  beforeAll(async () => {
    const { app, module } = await createModule()
    nestApp = app
    bookRepository = module.get<AbstractBookRepository<BookDocument>>(
      AbstractBookRepository
    )
    request = supertest(app.getHttpServer())
  })

  it('should create a new book', async () => {
    const book = {
      name: 'The End of Everything',
      category: 'SCIENCE',
      author: 'Katie Mack'
    }

    const { body } = await request
      .post('/books')
      .send(book)
      .expect(HttpStatus.CREATED)

    const createdBook = body.payload.book

    expect(createdBook).toEqual({
      _id: createdBook._id,
      name: book.name,
      category: book.category,
      author: book.author,
      createdAt: createdBook.createdAt
    })
  })

  afterEach(async () => {
    await bookRepository.deleteMany({})
  })

  afterAll(async () => {
    await nestApp.close()
  })
})

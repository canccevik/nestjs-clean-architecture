import supertest, { SuperTest } from 'supertest'
import { createModule } from './utils/create-module.util'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'
import { BookDocument } from '@book/domain/models/book.model'

describe('Book Controller - [PUT] /books/:bookId', () => {
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

  it('should update the book by id', async () => {
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

    book.author = 'Katherine J. Mack'

    const updatedBookResponse = await request
      .put(`/books/${createdBook._id}`)
      .send(book)
      .expect(HttpStatus.OK)

    const updatedBook = updatedBookResponse.body.payload.book

    expect(updatedBook).toEqual({
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

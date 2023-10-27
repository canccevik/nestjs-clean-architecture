import supertest, { SuperTest } from 'supertest'
import { createModule } from './utils/create-module.util'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AbstractBookRepository } from '@book/domain/repositories/book.repository'
import { BookDocument } from '@book/domain/models/book.model'

describe('Book Controller - [GET] /books', () => {
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

  it('should get all books', async () => {
    // ARRANGE
    const book = {
      name: 'The End of Everything',
      category: 'SCIENCE',
      author: 'Katie Mack'
    }

    const createdBookResponse = await request
      .post('/books')
      .send(book)
      .expect(HttpStatus.CREATED)

    const createdBook = createdBookResponse.body.payload

    // ACT
    const fetchedBooks = await request.get('/books').expect(HttpStatus.OK)

    const books = fetchedBooks.body.payload

    // ASSERT
    expect(books).toEqual([
      {
        _id: createdBook._id,
        name: book.name,
        category: book.category,
        author: book.author,
        createdAt: createdBook.createdAt
      }
    ])
  })

  afterEach(async () => {
    await bookRepository.deleteMany({})
  })

  afterAll(async () => {
    await nestApp.close()
  })
})

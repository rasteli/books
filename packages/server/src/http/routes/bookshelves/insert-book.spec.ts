import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '../../../app.ts'
import { makeAuthenticatedUser } from '../../../tests/factories/make-user.ts'
import { makeBook } from '../../../tests/factories/make-book.ts'
import { makeBookshelf } from '../../../tests/factories/make-bookshelf.ts'

describe('Insert books into bookshelf (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to insert a book to a bookshelf', async () => {
    const { user, token } = await makeAuthenticatedUser(app.jwt.sign)
    const book = await makeBook(user.id)
    const bookshelf = await makeBookshelf(user.id)

    const response = await request(app.server)
      .post('/bookshelves/insert-book')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        bookId: book.id,
        bookshelfId: bookshelf.id
      })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      bookBookshelfId: {
        bookId: book.id,
        bookshelfId: bookshelf.id
      }
    })
  })
})

import { expect, describe, beforeAll, it } from 'vitest'
import request from 'supertest'
import { randomUUID } from 'node:crypto'

import { app } from '../../../app.ts'
import { makeAuthenticatedUser } from '../../../tests/factories/make-user.ts'
import { makeBook } from '../../../tests/factories/make-book.ts'
import { makeBookshelf } from '../../../tests/factories/make-bookshelf.ts'
import { makeBookBookshelf } from '../../../tests/factories/make-book-bookshelf.ts'

describe('List bookshelves (e2e)', async () => {
  let user: {
    id: string
    username: string
    email: string
    password: string
    readingTime: number | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
  }

  let token: string

  beforeAll(async () => {
    await app.ready()
    const result = await makeAuthenticatedUser(app.jwt.sign)

    user = result.user
    token = result.token
  })

  it('should be able to list bookshelves with books', async () => {
    const bookshelfName = randomUUID()

    const book = await makeBook(user.id)
    const bookshelf = await makeBookshelf(user.id, bookshelfName)
    await makeBookBookshelf(book.id, bookshelf.id, user.id)

    const response = await request(app.server)
      .get('/bookshelves')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      bookshelves: [
        {
          id: expect.any(String),
          name: bookshelfName,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          books: [
            {
              id: book.id
            }
          ]
        }
      ],
      total: 1
    })
  })
})

import { expect, describe, beforeAll, it } from 'vitest'
import request from 'supertest'
import { randomUUID } from 'node:crypto'

import { app } from '../../../app.ts'
import { makeAuthenticatedUser } from '../../../tests/factories/make-user.ts'
import { makeBook } from '../../../tests/factories/make-book.ts'
import { makeCategory } from '../../../tests/factories/make-category.ts'
import { makeBookCategory } from '../../../tests/factories/make-book-category.ts'

const anyExpectancies = {
  id: expect.any(String),
  summary: expect.any(String),
  key: null,
  size: expect.any(Number),
  mimeType: expect.any(String),
  numOfPages: expect.any(Number),
  currentPage: expect.any(Number),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  categories: expect.any(Array),
  authors: expect.any(Array),
  tags: expect.any(Array),
  title: expect.any(String)
}

describe('List books (e2e)', async () => {
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

  it('should be able to list books by title', async () => {
    const title = randomUUID()
    const book = await makeBook(user.id, { title })

    const response = await request(app.server)
      .get(`/books?title=${book.title}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      books: [
        {
          ...anyExpectancies,
          title
        }
      ],
      total: 1
    })
  })

  it('should be able to list books by authors', async () => {
    const authors = Array.from({ length: 2 }).map(() => randomUUID())
    const book = await makeBook(user.id, { authors })
    const query = book.authors!.join('&author=')

    const response = await request(app.server)
      .get(`/books?author=${query}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      books: [
        {
          ...anyExpectancies,
          authors
        }
      ],
      total: 1
    })
  })

  it('should be able to list books by tags', async () => {
    const tags = Array.from({ length: 2 }).map(() => randomUUID())
    const book = await makeBook(user.id, { tags })
    const query = book.tags!.join('&tag=')

    const response = await request(app.server)
      .get(`/books?tag=${query}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      books: [
        {
          ...anyExpectancies,
          tags
        }
      ],
      total: 1
    })
  })

  it('should be able to list books by categories', async () => {
    const book = await makeBook(user.id)

    const categories = await Promise.all(
      Array.from({ length: 2 }).map(async () => {
        const category = await makeCategory(user.id)
        await makeBookCategory(book.id, category.id, user.id)

        return category.name
      })
    )

    const query = categories.join('&category=')

    const response = await request(app.server)
      .get(`/books?category=${query}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      books: [
        {
          ...anyExpectancies,
          categories
        }
      ],
      total: 1
    })
  })
})

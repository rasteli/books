import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '../../../app.ts'
import { makeAuthenticatedUser } from '../../../tests/factories/make-user.ts'
import { makeBook } from '../../../tests/factories/make-book.ts'
import { makeCategory } from '../../../tests/factories/make-category.ts'

describe('Assign categories (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to assign a category to a book', async () => {
    const { user, token } = await makeAuthenticatedUser(app.jwt.sign)
    const book = await makeBook(user.id)
    const category = await makeCategory(user.id)

    const response = await request(app.server)
      .post('/categories/assign')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        bookId: book.id,
        categoryId: category.id
      })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      bookCategoryId: {
        bookId: book.id,
        categoryId: category.id
      }
    })
  })
})

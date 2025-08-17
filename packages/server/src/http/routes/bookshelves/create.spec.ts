import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { randomInt } from 'node:crypto'

import { app } from '../../../app.ts'
import { makeAuthenticatedUser } from '../../../tests/factories/make-user.ts'

describe('Create bookshelves (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to create a bookshelf', async () => {
    const { token } = await makeAuthenticatedUser(app.jwt.sign)

    const response = await request(app.server)
      .post('/bookshelves')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.lorem.words(randomInt(1, 5))
      })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      bookshelfId: expect.any(String)
    })
  })
})

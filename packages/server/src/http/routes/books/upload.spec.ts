import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { randomInt } from 'node:crypto'

import { app } from '../../../app.ts'
import { makeAuthenticatedUser } from '../../../tests/factories/make-user.ts'

describe('Create books (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to create a book', async () => {
    const { token } = await makeAuthenticatedUser(app.jwt.sign)

    const response = await request(app.server)
      .post('/books')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: faker.lorem.words(randomInt(1, 5)),
        authors: Array.from({ length: randomInt(1, 3) }).map(_ => {
          return faker.person.fullName()
        }),
        tags: Array.from({ length: randomInt(1, 4) }).map(_ => {
          return faker.lorem.words(1)
        }),
        summary: faker.lorem.paragraph(1),
        size: randomInt(1, 104857600), // 100MB
        numOfPages: randomInt(1, 800),
        mimeType: 'application/pdf'
      })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      bookId: expect.any(String),
      signedUrl: expect.any(String)
    })
  })
})

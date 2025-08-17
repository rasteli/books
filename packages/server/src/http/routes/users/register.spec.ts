import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'
import { app } from '../../../app.ts'

describe('Register users (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to register a user', async () => {
    const response = await request(app.server)
      .post('/register')
      .set('Content-Type', 'application/json')
      .send({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: randomUUID()
      })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      userId: expect.any(String)
    })
  })
})

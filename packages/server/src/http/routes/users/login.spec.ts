import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app.ts'
import { makeUser } from '../../../tests/factories/make-user.ts'

describe('Login users (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to login a user', async () => {
    const { user, pwdB4Hash } = await makeUser()

    const response = await request(app.server)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({ username: user.username, password: pwdB4Hash })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})

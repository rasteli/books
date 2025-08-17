import { randomUUID } from 'node:crypto'
import { db } from '../../database/client.ts'
import { users } from '../../database/schema.ts'
import { faker } from '@faker-js/faker'
import { hash } from 'argon2'
import { SignOptions } from '@fastify/jwt'

export async function makeUser() {
  const pwdB4Hash = randomUUID()

  const result = await db
    .insert(users)
    .values({
      username: faker.internet.username({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      }),
      email: faker.internet.email(),
      password: await hash(pwdB4Hash)
    })
    .returning()

  return {
    user: result[0],
    pwdB4Hash
  }
}

type signFunction = (
  payload: string | object | Buffer<ArrayBufferLike>,
  options?: Partial<SignOptions>
) => string

export async function makeAuthenticatedUser(sign: signFunction) {
  const { user } = await makeUser()
  const token = sign({ sub: user.id })

  return { user, token }
}

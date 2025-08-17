import { z } from 'zod'
import { hash } from 'argon2'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../../database/client.ts'
import { users } from '../../../database/schema.ts'

export const registerRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/register',
    {
      schema: {
        body: z.object({
          username: z.string().min(3),
          email: z.email(),
          password: z.string()
        }),
        response: {
          201: z.object({ userId: z.uuid() }).describe('User registered')
        }
      }
    },
    async (request, reply) => {
      const { username, email, password } = request.body
      const passwordhash = await hash(password)

      const result = await db
        .insert(users)
        .values({
          username,
          email,
          password: passwordhash
        })
        .returning()

      return reply.status(201).send({ userId: result[0].id })
    }
  )
}

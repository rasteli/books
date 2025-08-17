import { z } from 'zod'
import { verify } from 'argon2'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { db } from '../../../database/client.ts'
import { users } from '../../../database/schema.ts'

export const loginRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/login',
    {
      schema: {
        body: z.object({
          username: z.string().min(3),
          password: z.string()
        }),
        response: {
          200: z.object({ token: z.string() }),
          400: z.object({ message: z.string() })
        }
      }
    },
    async (request, reply) => {
      const { username, password } = request.body
      const result = await db
        .select()
        .from(users)
        .where(eq(users.username, username))

      if (result.length === 0) {
        return reply.status(400).send({ message: 'Invalid credentials' })
      }

      const user = result[0]
      const doPasswordsMatch = await verify(user.password, password)

      if (!doPasswordsMatch) {
        return reply.status(400).send({ message: 'Invalid credentials' })
      }

      const token = app.jwt.sign({ sub: user.id })

      return reply.status(200).send({ token })
    }
  )
}

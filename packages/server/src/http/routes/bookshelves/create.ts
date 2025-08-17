import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJwt } from '../../middlewares/verify-jwt.ts'
import { db } from '../../../database/client.ts'
import { bookshelves } from '../../../database/schema.ts'

export const createBookshelvesRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/bookshelves',
    {
      onRequest: [verifyJwt],
      schema: {
        body: z.object({
          name: z.string()
        }),
        response: {
          201: z.object({ bookshelfId: z.uuid() }).describe('Book created')
        }
      }
    },
    async (request, reply) => {
      const { name } = request.body

      const result = await db
        .insert(bookshelves)
        .values({
          name,
          createdBy: request.user.sub
        })
        .returning()

      return reply.status(201).send({ bookshelfId: result[0].id })
    }
  )
}

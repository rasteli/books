import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJwt } from '../../middlewares/verify-jwt.ts'
import { db } from '../../../database/client.ts'
import { bookBookshelves } from '../../../database/schema.ts'

export const insertBookRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/bookshelves/insert-book',
    {
      onRequest: [verifyJwt],
      schema: {
        body: z.object({
          bookId: z.uuid(),
          bookshelfId: z.uuid()
        }),
        response: {
          201: z.object({
            bookBookshelfId: z.object({
              bookId: z.uuid(),
              bookshelfId: z.uuid()
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { bookId, bookshelfId } = request.body

      const result = await db
        .insert(bookBookshelves)
        .values({
          bookId,
          bookshelfId,
          assignedBy: request.user.sub
        })
        .returning()

      return reply.status(201).send({
        bookBookshelfId: {
          bookId: result[0].bookId,
          bookshelfId: result[0].bookshelfId
        }
      })
    }
  )
}

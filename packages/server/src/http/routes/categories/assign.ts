import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJwt } from '../../middlewares/verify-jwt.ts'
import { db } from '../../../database/client.ts'
import { bookCategories } from '../../../database/schema.ts'

export const assignBookCategoryRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/categories/assign',
    {
      onRequest: [verifyJwt],
      schema: {
        body: z.object({
          bookId: z.uuid(),
          categoryId: z.uuid()
        }),
        response: {
          201: z.object({
            bookCategoryId: z.object({
              bookId: z.uuid(),
              categoryId: z.uuid()
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { bookId, categoryId } = request.body

      const result = await db
        .insert(bookCategories)
        .values({
          bookId,
          categoryId,
          assignedBy: request.user.sub
        })
        .returning()

      return reply.status(201).send({
        bookCategoryId: {
          bookId: result[0].bookId,
          categoryId: result[0].categoryId
        }
      })
    }
  )
}

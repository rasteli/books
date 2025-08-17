import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJwt } from '../../middlewares/verify-jwt.ts'
import { db } from '../../../database/client.ts'
import { categories } from '../../../database/schema.ts'

export const createCategoryRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/categories',
    {
      onRequest: [verifyJwt],
      schema: {
        body: z.object({
          name: z.string()
        }),
        response: {
          201: z.object({ categoryId: z.uuid() }).describe('Category created')
        }
      }
    },
    async (request, reply) => {
      const { name } = request.body

      const result = await db
        .insert(categories)
        .values({
          name,
          createdBy: request.user.sub
        })
        .returning()

      return reply.status(201).send({ categoryId: result[0].id })
    }
  )
}

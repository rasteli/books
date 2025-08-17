import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'node:crypto'

import { verifyJwt } from '../../middlewares/verify-jwt.ts'
import { db } from '../../../database/client.ts'
import { books } from '../../../database/schema.ts'
import { r2 } from '../../../lib/cloudflare.ts'
import { env } from '../../../env/index.ts'

export const createBookRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/books',
    {
      onRequest: [verifyJwt],
      schema: {
        body: z.object({
          title: z.string(),
          authors: z.array(z.string()).optional(),
          tags: z.array(z.string()).optional(),
          summary: z.string().optional(),
          size: z.number(),
          numOfPages: z.number(),
          mimeType: z.literal('application/pdf')
        }),
        response: {
          201: z
            .object({ bookId: z.uuid(), signedUrl: z.url() })
            .describe('Book uploaded')
        }
      }
    },
    async (request, reply) => {
      const { title, authors, tags, summary, size, numOfPages, mimeType } =
        request.body

      const key = randomUUID().concat('-').concat(title)

      const result = await db
        .insert(books)
        .values({
          title,
          authors,
          tags,
          summary,
          size,
          key,
          numOfPages,
          mimeType,
          uploadedBy: request.user.sub
        })
        .returning()

      const signedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
          Bucket: `books-${env.NODE_ENV}`,
          Key: result[0].key as string,
          ContentType: mimeType
        }),
        { expiresIn: 600 }
      )

      return reply.status(201).send({ bookId: result[0].id, signedUrl })
    }
  )
}

import { z } from 'zod'
import { and, eq, SQL } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJwt } from '../../middlewares/verify-jwt.ts'
import { db } from '../../../database/client.ts'
import {
  bookBookshelves,
  books,
  bookshelves
} from '../../../database/schema.ts'

export const listBookshelvesRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/bookshelves',
    {
      onRequest: [verifyJwt],
      schema: {
        response: {
          200: z.object({
            bookshelves: z.array(
              z.object({
                id: z.uuid(),
                name: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
                books: z.array(
                  z.object({
                    id: z.uuid()
                  })
                )
              })
            ),
            total: z.number()
          })
        }
      }
    },
    async (request, reply) => {
      const conditions: SQL[] = [eq(bookshelves.createdBy, request.user.sub)]

      const [total, rows] = await Promise.all([
        db.$count(bookshelves, and(...conditions)),
        db
          .select({
            id: bookshelves.id,
            name: bookshelves.name,
            // books: sql`coalesce(array_agg(${books.id}) filter (where ${books.id} is not null), '{}')`,
            createdAt: bookshelves.createdAt,
            updatedAt: bookshelves.updatedAt,
            _book: books.id
          })
          .from(bookshelves)
          .leftJoin(
            bookBookshelves,
            eq(bookshelves.id, bookBookshelves.bookshelfId)
          )
          .leftJoin(books, eq(books.id, bookBookshelves.bookId))
          .where(and(...conditions))
      ])

      const rowsMap = new Map<string, any>()

      for (const row of rows) {
        if (!rowsMap.has(row.id)) {
          const { _book, ...rest } = row
          rowsMap.set(row.id, { ...rest, books: [] })
        }

        if (row._book) {
          rowsMap.get(row.id).books.push({ id: row._book })
        }
      }

      let result = [...rowsMap.values()]

      return reply.status(200).send({ bookshelves: result, total })
    }
  )
}

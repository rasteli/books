import { z } from 'zod'
import { and, arrayContains, eq, ilike, or, sql, SQL } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJwt } from '../../middlewares/verify-jwt.ts'
import { db } from '../../../database/client.ts'
import { books, bookCategories, categories } from '../../../database/schema.ts'

const toStringArray = <T>() =>
  z.preprocess(val => {
    if (val === undefined) return undefined
    if (typeof val === 'string') return [val]
    return val
  }, z.array(z.string()))

export const listBooksRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/books',
    {
      onRequest: [verifyJwt],
      schema: {
        querystring: z.object({
          title: z.string().optional(),
          author: toStringArray().optional(),
          tag: toStringArray().optional(),
          category: toStringArray().optional()
        }),
        response: {
          200: z.object({
            books: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
                authors: z.array(z.string()),
                tags: z.array(z.string()),
                categories: z.array(z.string()),
                summary: z.string().nullable(),
                key: z.string().nullable(),
                size: z.number(),
                mimeType: z.string(),
                numOfPages: z.number(),
                currentPage: z.number(),
                createdAt: z.date(),
                updatedAt: z.date()
              })
            ),
            total: z.number()
          })
        }
      }
    },
    async (request, reply) => {
      const { title, author, tag, category } = request.query
      const conditions: SQL[] = [eq(books.uploadedBy, request.user.sub)]

      if (title) {
        conditions.push(ilike(books.title, `%${title}%`))
      }

      if (author) {
        conditions.push(
          or(...author.map(t => arrayContains(books.authors, [t]))) as SQL
        )
      }

      if (tag) {
        conditions.push(
          or(...tag.map(t => arrayContains(books.tags, [t]))) as SQL
        )
      }

      const rows = await db
        .select({
          id: books.id,
          title: books.title,
          authors: books.authors,
          tags: books.tags,
          summary: books.summary,
          key: books.key,
          size: books.size,
          mimeType: books.mimeType,
          numOfPages: books.numOfPages,
          currentPage: books.currentPage,
          createdAt: books.createdAt,
          updatedAt: books.updatedAt,
          _category: categories.name
        })
        .from(books)
        .leftJoin(bookCategories, eq(books.id, bookCategories.bookId))
        .leftJoin(categories, eq(categories.id, bookCategories.categoryId))
        .where(and(...conditions))

      const rowsMap = new Map<string, any>()

      for (const row of rows) {
        if (!rowsMap.has(row.id)) {
          const { _category, ...rest } = row
          rowsMap.set(row.id, { ...rest, categories: [] })
        }

        if (row._category) {
          rowsMap.get(row.id).categories.push(row._category)
        }
      }

      let result = [...rowsMap.values()]

      if (category) {
        const set = new Set(category)

        result = result.filter(row => {
          return row.categories.some((cat: string) => set.has(cat))
        })
      }

      return reply.status(200).send({ books: result, total: result.length })
    }
  )
}

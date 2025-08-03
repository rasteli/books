import { z } from 'zod'

export const bookSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  tags: z.array(z.string()),
  summary: z.string(),
  key: z.string(),
  numberOfPages: z.number(),
  currentPage: z.optional(z.number()),
  createdBy: z.string()
})

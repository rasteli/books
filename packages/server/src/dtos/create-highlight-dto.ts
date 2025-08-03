import { z } from 'zod'
import { Book } from '../entities/book'

export const highlightSchema = z.object({
  book: z.object(Book),
  body: z.string(),
  comment: z.optional(z.string()),
  color: z.string(),
  createdBy: z.string()
})

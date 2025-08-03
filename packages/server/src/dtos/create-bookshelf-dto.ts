import { z } from 'zod'
import { Book } from '../entities/book'

export const bookshelfSchema = z.object({
  books: z.array(z.object(Book)),
  name: z.string(),
  createdBy: z.string()
})

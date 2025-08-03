import { z } from 'zod'

export const bookSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  tags: z.array(z.string()),
  summary: z.string(),
  key: z.string(),
  numberOfPages: z.number(),
  currentPage: z.optional(z.number()),
  createdBy: z.string(),
  size: z
    .int()
    .max(1 * 1024 * 1024 * 1024, { error: 'File size must not exceed 1GB' }), // 1GB
  mimeType: z.literal('application/pdf', {
    error: 'Only PDF files are accepted'
  })
})

import { bookSchema } from '../lib/zod/schemas/create-book-schema'
import { getFirstErrorMessage } from '../utils/zod'

interface BookProps {
  id?: string
  title: string
  authors: string[]
  tags: string[]
  summary: string
  key: string
  numberOfPages: number
  currentPage?: number
  categories?: string[]
  highlights?: string[]
  bookshelves?: string[]
  createdAt?: Date
  updatedAt?: Date
  createdBy: string
}

export class Book {
  private props: BookProps

  constructor(props: BookProps) {
    const result = bookSchema.safeParse(props)

    if (result.error) {
      const message = getFirstErrorMessage(result)
      throw new Error(message)
    }

    this.props = props
  }
}

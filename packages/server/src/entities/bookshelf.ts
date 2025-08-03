import { bookshelfSchema } from '../dtos/create-bookshelf-dto'
import { getFirstErrorMessage } from '../utils/zod'
import { Book } from './book'

interface BookshelfProps {
  id?: string
  name: string
  books: Book[]
  createdAt?: Date
  updatedAt?: Date
  createdBy: string
}

export class Bookshelf {
  private props: BookshelfProps

  constructor(props: BookshelfProps) {
    const result = bookshelfSchema.safeParse(props)

    if (result.error) {
      const message = getFirstErrorMessage(result)
      throw new Error(message)
    }

    this.props = props
  }
}

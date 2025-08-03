import { highlightSchema } from '../dtos/create-highlight-dto'
import { getFirstErrorMessage } from '../utils/zod'
import { Book } from './book'

interface HighlightProps {
  id?: string
  book: Book
  body: string
  comment?: string
  color: string
  createdAt?: Date
  createdBy: string
}

export class Highlight {
  private props: HighlightProps

  constructor(props: HighlightProps) {
    const result = highlightSchema.safeParse(props)

    if (result.error) {
      const message = getFirstErrorMessage(result)
      throw new Error(message)
    }

    this.props = props
  }
}

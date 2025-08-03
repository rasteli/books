import { getFirstErrorMessage } from '../utils/zod'
import { categorySchema } from '../lib/zod/schemas/create-category-schema'
import { Book } from './book'

interface CategoryProps {
  id?: string
  name: string
  books?: Book[]
  createdAt?: Date
  createdBy: string
}

export class Category {
  private props: CategoryProps

  constructor(props: CategoryProps) {
    const result = categorySchema.safeParse(props)

    if (result.error) {
      const message = getFirstErrorMessage(result)
      throw new Error(message)
    }

    this.props = props
  }
}

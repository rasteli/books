import { db } from '../../database/client.ts'
import { bookCategories } from '../../database/schema.ts'

export async function makeBookCategory(
  bookId: string,
  categoryId: string,
  assignedBy: string
) {
  const result = await db
    .insert(bookCategories)
    .values({
      bookId,
      categoryId,
      assignedBy
    })
    .returning()

  return result[0]
}

import { db } from '../../database/client.ts'
import { bookBookshelves } from '../../database/schema.ts'

export async function makeBookBookshelf(
  bookId: string,
  bookshelfId: string,
  assignedBy: string
) {
  const result = await db
    .insert(bookBookshelves)
    .values({
      bookId,
      bookshelfId,
      assignedBy
    })
    .returning()

  return result[0]
}

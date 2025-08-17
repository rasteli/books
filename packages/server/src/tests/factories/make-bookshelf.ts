import { randomInt } from 'node:crypto'
import { faker } from '@faker-js/faker'
import { db } from '../../database/client.ts'
import { bookshelves } from '../../database/schema.ts'

export async function makeBookshelf(createdBy: string, name?: string) {
  const result = await db
    .insert(bookshelves)
    .values({
      name: name ?? faker.lorem.words(randomInt(1, 5)),
      createdBy
    })
    .returning()

  return result[0]
}

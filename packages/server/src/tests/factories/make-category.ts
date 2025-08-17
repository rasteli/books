import { randomInt } from 'node:crypto'
import { faker } from '@faker-js/faker'
import { db } from '../../database/client.ts'
import { categories } from '../../database/schema.ts'

export async function makeCategory(createdBy: string, name?: string) {
  const result = await db
    .insert(categories)
    .values({
      name: name ?? faker.lorem.words(randomInt(1, 5)),
      createdBy
    })
    .returning()

  return result[0]
}

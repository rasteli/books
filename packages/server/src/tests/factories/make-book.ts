import { randomInt } from 'node:crypto'
import { db } from '../../database/client.ts'
import { books } from '../../database/schema.ts'
import { faker } from '@faker-js/faker'

type makeBookOpts = {
  title?: string
  authors?: string[]
  tags?: string[]
  summary?: string
  size?: number
  numOfPages?: number
  mimeType?: string
}

export async function makeBook(uploadedBy: string, opts?: makeBookOpts) {
  const result = await db
    .insert(books)
    .values({
      title: opts?.title ?? faker.lorem.words(randomInt(1, 5)),
      authors:
        opts?.authors ??
        Array.from({ length: randomInt(1, 3) }).map(_ => {
          return faker.person.fullName()
        }),
      tags:
        opts?.tags ??
        Array.from({ length: randomInt(1, 4) }).map(_ => {
          return faker.lorem.words(1)
        }),
      summary: opts?.summary ?? faker.lorem.paragraph(1),
      size: opts?.size ?? randomInt(1, 104857600), // 100MB
      numOfPages: opts?.numOfPages ?? randomInt(1, 800),
      mimeType: opts?.mimeType ?? faker.system.mimeType(),
      uploadedBy
    })
    .returning()

  return result[0]
}

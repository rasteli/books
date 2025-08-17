import { randomInt } from 'node:crypto'
import { db } from './client.ts'
import {
  users,
  books,
  categories,
  bookCategories,
  bookshelves,
  bookBookshelves
} from './schema.ts'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { hash } from 'argon2'

function getBookData() {
  return {
    title: faker.lorem.words(randomInt(1, 5)),
    authors: Array.from({ length: randomInt(1, 3) }).map(_ => {
      return faker.person.fullName()
    }),
    tags: Array.from({ length: randomInt(1, 4) }).map(_ => {
      return faker.lorem.words(1)
    }),
    summary: faker.lorem.paragraph(1),
    size: randomInt(1, 104857600), // 100MB
    numOfPages: randomInt(1, 800),
    mimeType: faker.system.mimeType()
  }
}

export async function seed() {
  const passwordHash = await hash('123456')

  const usersResult = await db
    .insert(users)
    .values([
      {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: passwordHash
      },
      {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: passwordHash
      },
      {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: passwordHash
      }
    ])
    .returning()

  const booksResult = await db
    .insert(books)
    .values([
      {
        ...getBookData(),
        uploadedBy: usersResult[0].id
      },
      {
        ...getBookData(),
        uploadedBy: usersResult[1].id
      },
      {
        ...getBookData(),
        uploadedBy: usersResult[2].id
      }
    ])
    .returning()

  const categoriesResult = await db
    .insert(categories)
    .values([
      {
        name: faker.lorem.words(randomInt(1, 5)),
        createdBy: usersResult[0].id
      },
      {
        name: faker.lorem.words(randomInt(1, 5)),
        createdBy: usersResult[1].id
      },
      { name: faker.lorem.words(randomInt(1, 5)), createdBy: usersResult[2].id }
    ])
    .returning()

  await db.insert(bookCategories).values([
    {
      bookId: booksResult[0].id,
      categoryId: categoriesResult[0].id,
      assignedBy: usersResult[0].id
    },
    {
      bookId: booksResult[1].id,
      categoryId: categoriesResult[1].id,
      assignedBy: usersResult[1].id
    },
    {
      bookId: booksResult[2].id,
      categoryId: categoriesResult[2].id,
      assignedBy: usersResult[2].id
    }
  ])

  const bookshelvesResult = await db
    .insert(bookshelves)
    .values([
      {
        name: faker.lorem.words(randomInt(1, 3)),
        createdBy: usersResult[0].id
      },
      {
        name: faker.lorem.words(randomInt(1, 3)),
        createdBy: usersResult[1].id
      },
      { name: faker.lorem.words(randomInt(1, 3)), createdBy: usersResult[2].id }
    ])
    .returning()

  await db.insert(bookBookshelves).values([
    {
      bookId: booksResult[0].id,
      bookshelfId: bookshelvesResult[0].id,
      assignedBy: usersResult[0].id
    },
    {
      bookId: booksResult[1].id,
      bookshelfId: bookshelvesResult[1].id,
      assignedBy: usersResult[1].id
    },
    {
      bookId: booksResult[2].id,
      bookshelfId: bookshelvesResult[2].id,
      assignedBy: usersResult[2].id
    }
  ])
}

seed()

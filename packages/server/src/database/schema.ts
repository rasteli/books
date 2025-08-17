import { sql } from 'drizzle-orm'
import {
  pgTable,
  text,
  uuid,
  timestamp,
  boolean,
  primaryKey,
  integer
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
  readingTime: integer().default(0),
  isActive: boolean().default(true).notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export const books = pgTable('books', {
  id: uuid().primaryKey().defaultRandom(),
  uploadedBy: uuid()
    .notNull()
    .references(() => users.id),
  title: text().notNull(),
  authors: text()
    .array()
    .default(sql`ARRAY[]::text[]`),
  tags: text()
    .array()
    .default(sql`ARRAY[]::text[]`),
  summary: text(),
  key: text(),
  size: integer().notNull(),
  mimeType: text().notNull(),
  numOfPages: integer().notNull(),
  currentPage: integer().default(1),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export const categories = pgTable('categories', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull().unique(),
  createdBy: uuid()
    .notNull()
    .references(() => users.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export const bookCategories = pgTable(
  'bookCategories',
  {
    bookId: uuid()
      .notNull()
      .references(() => books.id),
    categoryId: uuid()
      .notNull()
      .references(() => categories.id),
    assignedBy: uuid()
      .notNull()
      .references(() => users.id),
    assignedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  table => [primaryKey({ columns: [table.bookId, table.categoryId] })]
)

export const highlights = pgTable('highlights', {
  id: uuid().primaryKey().defaultRandom(),
  bookId: uuid()
    .notNull()
    .references(() => books.id),
  body: text().notNull(),
  tags: text()
    .array()
    .default(sql`ARRAY[]::text[]`),
  color: text().default('#fff85b').notNull(),
  createdBy: uuid()
    .notNull()
    .references(() => users.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export const bookshelves = pgTable('bookshelves', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  createdBy: uuid()
    .notNull()
    .references(() => users.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow()
})

export const bookBookshelves = pgTable(
  'bookBookshelves',
  {
    bookId: uuid()
      .notNull()
      .references(() => books.id),
    bookshelfId: uuid()
      .notNull()
      .references(() => bookshelves.id),
    assignedBy: uuid()
      .notNull()
      .references(() => users.id),
    assignedAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  table => [primaryKey({ columns: [table.bookId, table.bookshelfId] })]
)

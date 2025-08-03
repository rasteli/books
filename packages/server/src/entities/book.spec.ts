import { describe, it, expect } from 'vitest'
import { Book } from './book'

function createBook(
  title: string,
  authors: string[],
  tags: string[],
  summary: string,
  key: string,
  numberOfPages: number,
  createdBy: string
) {
  return new Book({
    title,
    authors,
    tags,
    summary,
    key,
    numberOfPages,
    createdBy
  })
}

describe('Create book', () => {
  it('should be able to create a book', () => {
    const title = 'As duas torres'
    const authors = ['JRR Tolkien']
    const tags = ['fantasy', 'romance']
    const summary = 'Second volume of The Lord of the Rings trilogy'
    const key = 'dkasjhjda327das120da-32#@dsa'
    const numberOfPages = 464
    const createdBy = 'johndoe'

    expect(() =>
      createBook(title, authors, tags, summary, key, numberOfPages, createdBy)
    ).not.toThrow()
  })
})

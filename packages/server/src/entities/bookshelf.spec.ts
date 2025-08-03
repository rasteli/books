import { describe, it, expect } from 'vitest'
import { Bookshelf } from './bookshelf'
import { Book } from './book'

function createBookshelf(books: Book[], name: string, createdBy: string) {
  return new Bookshelf({
    books,
    name,
    createdBy
  })
}

describe('Create bookshelf', () => {
  it('should be able to create a bookshelf', () => {
    const name = 'My Bookshelf'
    const createdBy = 'johndoe'

    const book = new Book({
      title: 'As duas torres',
      authors: ['JRR Tolkien'],
      tags: ['fantasy', 'romance'],
      summary: 'Second volume of The Lord of the Rings trilogy',
      key: 'dkasjhjda327das120da-32#@dsa',
      numberOfPages: 464,
      createdBy
    })

    expect(() => createBookshelf([book, book], name, createdBy)).not.toThrow()
  })
})

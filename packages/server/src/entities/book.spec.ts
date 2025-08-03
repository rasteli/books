import { describe, it, expect } from 'vitest'
import { Book } from './book'

function createBook(size: number, mimeType: string) {
  return new Book({
    title: 'As duas torres',
    authors: ['JRR Tolkien'],
    tags: ['fantasy', 'romance'],
    summary: 'Second volume of The Lord of the Rings trilogy',
    key: 'dkasjhjda327das120da-32#@dsa',
    numberOfPages: 464,
    createdBy: 'johndoe',
    size,
    mimeType
  })
}

describe('Create book', () => {
  it('should be able to create a book', () => {
    const size = 1 * 1024 * 1024 * 1024
    const mimeType = 'application/pdf'

    expect(() => createBook(size, mimeType)).not.toThrow()
  })

  it('should not be able to create a book exceeding 1GB in size', () => {
    const size = 2 * 1024 * 1024 * 1024
    const mimeType = 'application/pdf'

    expect(() => createBook(size, mimeType)).toThrow(
      'File size must not exceed 1GB'
    )
  })

  it('should not be able to create a book with an invalid MIME type', () => {
    const size = 1 * 1024 * 1024 * 1024
    const mimeType = 'application/epub+zip'

    expect(() => createBook(size, mimeType)).toThrow(
      'Only PDF files are accepted'
    )
  })
})

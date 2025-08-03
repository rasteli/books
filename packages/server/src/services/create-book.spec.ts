import { describe, it, expect } from 'vitest'
import { MemoryBookRepository } from '../repositories/memory/memory-book-repository'
import { CreateBook } from './create-book'

describe('[use-case] Crete book', () => {
  it('should be able to create a book through service', async () => {
    const memoryRepository = new MemoryBookRepository()
    const sut = new CreateBook(memoryRepository)

    const title = 'As duas torres'
    const authors = ['JRR Tolkien']
    const tags = ['fantasy', 'romance']
    const summary = 'Second volume of The Lord of the Rings trilogy'
    const key = 'dkasjhjda327das120da-32#@dsa'
    const numberOfPages = 464
    const createdBy = 'johndoe'
    const size = 1 * 1024 * 1024 * 1024
    const mimeType = 'application/pdf'

    await expect(
      sut.execute({
        title,
        authors,
        tags,
        summary,
        key,
        numberOfPages,
        createdBy,
        size,
        mimeType
      })
    ).resolves.not.toThrow()
  })
})

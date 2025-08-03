import { BookRepository } from '../repositories/book-repository'

interface CreateBookRequest {
  title: string
  authors: string[]
  tags: string[]
  summary: string
  key: string
  size: number
  mimeType: string
  numberOfPages: number
  createdBy: string
}

export class CreateBook {
  constructor(private bookRepository: BookRepository) {}

  async execute({
    authors,
    createdBy,
    key,
    numberOfPages,
    summary,
    tags,
    title,
    size,
    mimeType
  }: CreateBookRequest): Promise<void> {
    this.bookRepository.save({
      authors,
      createdBy,
      key,
      numberOfPages,
      summary,
      tags,
      title,
      size,
      mimeType
    })
  }
}

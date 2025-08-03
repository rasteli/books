import { FindAllBooksDTO } from '../../dtos/find-all-books-dto'
import { SaveBookDTO } from '../../dtos/save-book-dto'
import { Book } from '../../entities/book'
import { BookRepository } from '../book-repository'

export class MemoryBookRepository implements BookRepository {
  private items: Book[] = []

  async findAll(dto: FindAllBooksDTO): Promise<Book[]> {
    const books = this.items.filter(item => {
      return item.createdBy === dto.username
    })

    return books
  }

  async save(dto: SaveBookDTO): Promise<void> {
    const book = new Book(dto)
    this.items.push(book)
  }
}

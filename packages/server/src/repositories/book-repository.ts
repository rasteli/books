import { FindAllBooksDTO } from '../dtos/find-all-books-dto'
import { SaveBookDTO } from '../dtos/save-book-dto'
import { Book } from '../entities/book'

export abstract class BookRepository {
  abstract save(dto: SaveBookDTO): Promise<void>
  abstract findAll(dto: FindAllBooksDTO): Promise<Book[]>
}

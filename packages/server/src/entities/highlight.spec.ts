import { describe, it, expect } from 'vitest'
import { Highlight } from './highlight'
import { Book } from './book'

function createHighlight(
  book: Book,
  body: string,
  color: string,
  createdBy: string
) {
  return new Highlight({
    book,
    body,
    color,
    createdBy
  })
}

describe('Create highlight', () => {
  it('should be able to create a highlight', () => {
    const body =
      'Nas Cataratas de Rauros, Boromir luta para defender Merry e Pippin do ataque dos orques, mas acaba morto e os hobbits são capturados. Aragorn, Legolas e Gimli saem à caçada pelos amigos e no meio do caminho encontram Éomer e os Cavaleiros de Rohan.'
    const color = '#fff'
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

    expect(() => createHighlight(book, body, color, createdBy)).not.toThrow()
  })
})

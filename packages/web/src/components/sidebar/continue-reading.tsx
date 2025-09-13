import Link from 'next/link'
import Image from 'next/image'
import { Heading } from '@/components/ui/heading'
import { Progress } from '@/components/ui/progress'

import cover from './cover.png'

export function ContinueReading() {
  const book = {
    cover,
    title: 'Fundamentals of Software Architecture',
    authors: ['Mark Richards', 'Neal Ford'],
    currentPage: 127,
    pagesTotal: 422,
    href: 'book_link'
  }

  const authorsCount = book.authors.length
  const progress = Math.round((book.currentPage / book.pagesTotal) * 100)

  return (
    <div>
      <Heading className="font-bold">
        <h3>Continue de onde parou</h3>
      </Heading>

      <div className="flex gap-4 mt-7 justify-center items-center">
        <Link href={book.href} className="hover:brightness-50 duration-75">
          <Image src={book.cover} width={180} height={185} alt="" />
        </Link>

        <div className="text-sm">
          <Link
            href={book.href}
            className="font-semibold mb-3 hover:text-accent-foreground duration-75"
          >
            {book.title}
          </Link>
          <div className="flex justify-between">
            <p>{book.authors[0]}</p>
            <span>{authorsCount > 1 && `+${authorsCount - 1}`}</span>
          </div>

          <div className="mt-7">
            <p className="font-semibold">Progresso</p>
            <Progress value={progress} className="mt-3 mb-1" />
            <span className="text-xs text-secondary-foreground font-semibold">
              {book.currentPage} / {book.pagesTotal} ({progress}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

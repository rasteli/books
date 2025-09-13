import Link from 'next/link'

export function Navbar() {
  const items = [
    { label: 'Favoritos', count: 5, href: 'favourites' },
    { label: 'Minhas Estantes', count: 2, href: 'bookshelves' },
    { label: 'Meus Livros', count: 52, href: 'books' },
    { label: 'Estou Lendo', count: 3, href: 'reading' },
    { label: 'Lidos', count: 17, href: 'read' },
    { label: 'Highlights', count: 154, href: 'highlights' }
  ]

  return (
    <nav>
      <ul className="flex flex-col gap-4">
        {items.map(item => (
          <Link
            key={item.label}
            href={item.href}
            className="flex justify-between group cursor-pointer font-medium"
          >
            <span className="group-hover:text-accent-foreground duration-75">
              {item.label}
            </span>
            <span className="text-secondary-foreground group-hover:text-accent-foreground duration-75">
              {item.count}
            </span>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

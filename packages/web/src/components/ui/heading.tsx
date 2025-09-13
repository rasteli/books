import * as React from 'react'
import { Koh_Santepheap } from 'next/font/google'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

interface HeadingProps extends React.ComponentProps<'h1'> {
  children: React.ReactNode
}

const koh = Koh_Santepheap({
  subsets: ['latin'],
  weight: ['400', '700']
})

export function Heading({ children, className }: HeadingProps) {
  return <Slot className={cn(koh.className, className)}>{children}</Slot>
}

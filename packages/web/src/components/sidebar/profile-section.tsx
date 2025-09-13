import Image from 'next/image'
import { Heading } from '@/components/ui/heading'

import me from './rasteli.png'

export function ProfileSection() {
  return (
    <section>
      <div>
        <Heading className="text-4xl">
          <h1>
            <span className="text-accent-foreground">READING</span>
            APP
          </h1>
        </Heading>
      </div>

      <div className="flex items-center gap-4 my-9">
        <div className="rounded-full size-[100px] border-2 border-foreground">
          <Image
            src={me}
            width={100}
            height={100}
            className="rounded-full"
            alt=""
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xl">John Doe</span>
          <span className="text-accent-foreground font-medium">@johndoe</span>
        </div>
      </div>

      <div className="bg-card rounded-[4px] p-5">
        <span className="font-bold text-sm">Tempo de leitura</span>
        <div className="mt-4 flex gap-10 text-4xl font-semibold text-accent-foreground items-center justify-center">
          <div>
            18
            <span className="text-2xl">H</span>
          </div>
          <div>
            25
            <span className="text-2xl">M</span>
          </div>
        </div>
      </div>
    </section>
  )
}

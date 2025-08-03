import { z } from 'zod'
import type { FastifyTypedInstance } from './types'
import { randomUUID } from 'node:crypto'
import { userSchema } from './lib/zod/schemas/create-user-schema'

interface User {
  id: string
  username: string
  email: string
}

const users: User[] = []

export async function routes(app: FastifyTypedInstance) {
  app.get(
    '/users',
    {
      schema: {
        description: 'Lista todos os usuários',
        tags: ['Usuário'],
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              username: z.string(),
              email: z.string()
            })
          )
        }
      }
    },
    () => {
      return users
    }
  )

  app.post(
    '/users',
    {
      schema: {
        description: 'Cria um usuário',
        tags: ['Usuário'],
        body: userSchema,
        response: {
          201: z.null().describe('Usuário criado')
        }
      }
    },
    async (request, response) => {
      const { email, password, username } = request.body

      users.push({
        id: randomUUID(),
        username,
        email
      })

      return response.status(201).send()
    }
  )
}

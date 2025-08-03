import z from 'zod'
import type { FastifyTypedInstance } from './types'
import { randomUUID } from 'node:crypto'

interface User {
  id: string
  name: string
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
              name: z.string(),
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
        body: z.object({
          name: z.string(),
          email: z.email()
        }),
        response: {
          201: z.null().describe('Usuário criado')
        }
      }
    },
    async (request, response) => {
      const { email, name } = request.body

      users.push({
        id: randomUUID(),
        name,
        email
      })

      return response.status(201).send()
    }
  )
}

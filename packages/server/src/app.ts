import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { fastifySwagger } from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'

import { env } from './env/index.ts'
import { registerRoute } from './http/routes/users/register.ts'
import { loginRoute } from './http/routes/users/login.ts'
import { createBookRoute } from './http/routes/books/upload.ts'
import { createCategoryRoute } from './http/routes/categories/create.ts'
import { assignBookCategoryRoute } from './http/routes/categories/assign.ts'
import { listBooksRoute } from './http/routes/books/list.ts'
import { createBookshelvesRoute } from './http/routes/bookshelves/create.ts'
import { listBookshelvesRoute } from './http/routes/bookshelves/list.ts'
import { insertBookRoute } from './http/routes/bookshelves/insert-book.ts'

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
}).withTypeProvider<ZodTypeProvider>()

if (env.NODE_ENV === 'dev') {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Desafio Node.js',
        version: '1.0.0'
      }
    },
    transform: jsonSchemaTransform
  })

  app.register(scalarApiReference, {
    routePrefix: '/docs'
  })
}

// Possibilita a transformação dos dados de saída
app.setSerializerCompiler(serializerCompiler)
// Validação dos dados de entradas
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d'
  }
})

app.register(registerRoute)
app.register(loginRoute)
app.register(createBookRoute)
app.register(createCategoryRoute)
app.register(assignBookCategoryRoute)
app.register(listBooksRoute)
app.register(createBookshelvesRoute)
app.register(insertBookRoute)
app.register(listBookshelvesRoute)

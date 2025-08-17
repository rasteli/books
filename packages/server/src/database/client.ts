import { env } from '../env/index.ts'
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle(env.DATABASE_URL, {
  logger: env.NODE_ENV === 'dev'
})

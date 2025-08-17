import { app } from './app.ts'
import { env } from './env/index.ts'

app.listen({ port: env.PORT }, () => {
  console.log(`Server listening on port ${env.PORT}`)
})

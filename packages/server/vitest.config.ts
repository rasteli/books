import { defineConfig } from 'vitest/config'
import dotenvFlow from 'dotenv-flow'

const env = dotenvFlow.config({
  path: './packages/server',
  pattern: '.env.test'
})

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts']
  },
  define: {
    'process.env': env.parsed
  }
})

import { z } from 'zod'
import { hashPassowrd } from '../utils/bcrypt'
import { getFirstErrorMessage } from '../utils/zod'

export const userSchema = z.object({
  username: z.string().min(3, {
    error: 'Username must have at least 3 characters'
  }),
  password: z
    .string()
    .min(8, { error: 'Password must have at least 8 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/, {
      error:
        'Password must have at least one lowercase and one uppercase letter and one number'
    }),
  email: z.email({ error: 'Email must be a valid e-mail address' })
})

export class User {
  public username: string
  public email: string
  public password: string

  constructor(username: string, email: string, password: string) {
    const result = userSchema.safeParse({ username, email, password })

    if (result.error) {
      const message = getFirstErrorMessage(result)
      throw new Error(message)
    }

    this.username = username
    this.email = email
    this.password = hashPassowrd(password)
  }
}

import { z } from 'zod'

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

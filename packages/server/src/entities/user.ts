import { hashPassowrd } from '../utils/bcrypt'
import { getFirstErrorMessage } from '../utils/zod'
import { userSchema } from '../dtos/create-user-dto'

interface UserProps {
  id?: string
  username: string
  email: string
  password: string
  readingTime?: number
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  private props: UserProps

  constructor(props: UserProps) {
    const result = userSchema.safeParse(props)

    if (result.error) {
      const message = getFirstErrorMessage(result)
      throw new Error(message)
    }

    this.props = {
      ...props,
      password: hashPassowrd(props.password)
    }
  }
}

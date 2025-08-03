import { UserRepository } from '../repositories/user-repository'

interface CreateUserRequest {
  username: string
  email: string
  password: string
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute({
    username,
    email,
    password
  }: CreateUserRequest): Promise<void> {
    const user = await this.userRepository.findUnique({ email, username })

    if (user) {
      throw new Error('Username or e-mail address already in use')
    }

    this.userRepository.save({ username, email, password })
  }
}

import { FindUniqueUserDTO } from '../../dtos/find-unique-user-dto'
import { SaveUserDTO } from '../../dtos/save-user-dto'
import { User } from '../../entities/user'
import { hashPassowrd } from '../../utils/bcrypt'
import { UserRepository } from '../user-repository'

export class MemoryUserRepository implements UserRepository {
  private items: User[] = []

  async findUnique(dto: FindUniqueUserDTO): Promise<User | null> {
    const user = this.items.find(item => {
      return item.email == dto.email || item.username == dto.username
    })

    if (!user) {
      return null
    }

    return user
  }

  async save(dto: SaveUserDTO): Promise<void> {
    const user = new User({
      email: dto.email,
      username: dto.username,
      password: hashPassowrd(dto.password)
    })

    this.items.push(user)
  }
}

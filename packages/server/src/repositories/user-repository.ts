import { FindUniqueUserDTO } from '../dtos/find-unique-user-dto'
import { SaveUserDTO } from '../dtos/save-user-dto'
import { User } from '../entities/user'

export abstract class UserRepository {
  abstract save(dto: SaveUserDTO): Promise<void>
  abstract findUnique(dto: FindUniqueUserDTO): Promise<User | null>
}

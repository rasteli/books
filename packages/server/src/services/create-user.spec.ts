import { describe, it, expect } from 'vitest'
import { CreateUser } from './create-user'
import { MemoryUserRepository } from '../repositories/memory/memory-user-repository'

describe('[use-case] Create user', () => {
  it('should be able to create a user through service', async () => {
    const memoryRepository = new MemoryUserRepository()
    const sut = new CreateUser(memoryRepository)

    const username = 'johndoe'
    const password = 'Password123'
    const email = 'johndoe@test.com'

    await expect(
      sut.execute({ username, password, email })
    ).resolves.not.toThrow()
  })

  it('should not be able to create a user with an existing e-mail', async () => {
    const memoryRepository = new MemoryUserRepository()
    const sut = new CreateUser(memoryRepository)

    const email = 'johndoe@test.com'
    await sut.execute({ username: 'johndoe', email, password: 'Password123' })

    await expect(
      sut.execute({ username: 'janedoe', email, password: 'pASSWORD123' })
    ).rejects.toThrow('Username or e-mail address already in use')
  })

  it('should not be able to create a user with an existing username', async () => {
    const memoryRepository = new MemoryUserRepository()
    const sut = new CreateUser(memoryRepository)

    const username = 'johndoe'
    await sut.execute({
      username,
      email: 'test1@test.com',
      password: 'Password123'
    })
    await expect(
      sut.execute({
        username,
        email: 'test2@test.com',
        password: 'pASSWORD123'
      })
    ).rejects.toThrow('Username or e-mail address already in use')
  })
})

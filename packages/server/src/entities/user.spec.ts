import { describe, it, expect } from 'vitest'
import { User } from './user'

function createUser(username: string, email: string, password: string) {
  return new User(username, email, password)
}

describe('Create user', () => {
  it('should crete a user', () => {
    const username = 'johndoe'
    const password = 'Password123'
    const email = 'johndoe@test.com'

    expect(() => createUser(username, email, password)).not.toThrow()
  })

  it('should not create a user with invalid username', () => {
    const password = 'Password123'
    const email = 'johndoe@test.com'

    expect(() => createUser('jo', email, password)).toThrow(
      'Username must have at least 3 characters'
    )
  })

  it('should not create a user with invalid e-mail', () => {
    const username = 'johndoe'
    const password = 'Password123'

    for (const email of ['john@test', 'john.test.com']) {
      expect(() => createUser(username, email, password)).toThrow(
        'Email must be a valid e-mail address'
      )
    }
  })

  it('should not create a user with invalid password', () => {
    const username = 'johndoe'
    const email = 'johndoe@test.com'

    expect(() => createUser(username, email, 'pass')).toThrow(
      'Password must have at least 8 characters'
    )

    for (const password of [
      'password123',
      'PASSWORD123',
      'PASSWORD',
      'password'
    ]) {
      expect(() => createUser(username, email, password)).toThrow(
        'Password must have at least one lowercase and one uppercase letter and one number'
      )
    }
  })
})

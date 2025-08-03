import { describe, it, expect } from 'vitest'
import { Category } from './category'

function createCategory(name: string, createdBy: string) {
  return new Category({
    name,
    createdBy
  })
}

describe('Create category', () => {
  it('should be able to create a category', () => {
    const name = 'Fiction'
    const createdBy = 'johndoe'

    expect(() => createCategory(name, createdBy)).not.toThrow()
  })
})

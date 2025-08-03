import { z } from 'zod'

type ErrorTree<T> = {
  properties: {
    [K in keyof T]: {
      errors: string[]
    }
  }
}

export function getFirstErrorMessage<T>(
  result: z.ZodSafeParseResult<{
    [K in keyof T]: T[K]
  }>
) {
  const tree = z.treeifyError(result.error!) as ErrorTree<T>
  const keys = Object.keys(tree.properties)
  const prop = keys[0] as keyof T
  const message = tree.properties[prop]?.errors[0]

  return message
}

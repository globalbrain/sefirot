import { isString } from '../../support/Utils'

export function minLength(value: unknown, length: number): boolean {
  if (!(isString(value) || Array.isArray(value))) { return false }

  return value.length >= length
}

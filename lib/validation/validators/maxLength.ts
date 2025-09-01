import { isString } from '../../support/Utils'

export function maxLength(value: unknown, length: number): boolean {
  if (!(isString(value) || Array.isArray(value))) { return false }

  return value.length <= length
}

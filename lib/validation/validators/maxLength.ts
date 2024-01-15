import { isArray, isString } from '../../support/Utils'

export function maxLength(value: unknown, length: number): boolean {
  if (!(isString(value) || isArray(value))) {
    return false
  }

  return value.length <= length
}

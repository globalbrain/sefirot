import { isArray, isNullish, isString } from '../../support/Utils'

export function required(value: unknown): boolean {
  if (isArray(value)) {
    return !!value.length
  }

  if (isNullish(value)) {
    return false
  }

  if (value === false) {
    return true
  }

  if (value instanceof Date) {
    return !Number.isNaN(value.getTime())
  }

  if (isString(value)) {
    value = value.trim()
  }

  return !!String(value).length
}

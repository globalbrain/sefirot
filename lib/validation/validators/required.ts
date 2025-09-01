import { isString } from '../../support/Utils'

export function required(value: unknown): boolean {
  if (isString(value)) {
    value = value.trim()
  }

  return _required(value)
}

export function _required(value: unknown): boolean {
  if (Array.isArray(value)) {
    return !!value.length
  }

  if (value == null) { return false }

  if (value === false) { return true }

  if (value instanceof Date) {
    return !Number.isNaN(value.getTime())
  }

  return !!String(value).length
}

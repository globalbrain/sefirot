import { isArray, isDate, isNullish, isString } from '../../support/Utils'

export function required(value: unknown): boolean {
  if (isString(value)) {
    value = value.trim()
  }

  return _required(value)
}

export function _required(value: unknown): boolean {
  if (isArray(value)) {
    return !!value.length
  }

  if (isNullish(value)) {
    return false
  }

  if (value === false) {
    return true
  }

  if (isDate(value)) {
    return !Number.isNaN(value.getTime())
  }

  return !!String(value).length
}

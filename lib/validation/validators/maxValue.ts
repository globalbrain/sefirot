import { isNumber, isString } from '../../support/Utils'

export function maxValue(value: unknown, max: number) {
  if (isNumber(value) || isString(value) || value instanceof Date) {
    return +value <= max
  }

  return false
}

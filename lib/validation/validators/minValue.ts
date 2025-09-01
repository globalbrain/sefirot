import { isNumber, isString } from '../../support/Utils'

export function minValue(value: unknown, min: number) {
  if (isNumber(value) || isString(value) || value instanceof Date) {
    return +value >= min
  }

  return false
}

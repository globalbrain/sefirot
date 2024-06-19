import { isDate, isNumber, isString } from '../../support/Utils'

export function maxValue(value: unknown, max: number) {
  if (isNumber(value) || isString(value) || isDate(value)) {
    return +value <= max
  }

  return false
}

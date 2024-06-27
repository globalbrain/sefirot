import { isDate, isNumber, isString } from '../../support/Utils'

export function minValue(value: unknown, min: number) {
  if (isNumber(value) || isString(value) || isDate(value)) {
    return +value >= min
  }

  return false
}

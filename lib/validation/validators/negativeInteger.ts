import { isNumber } from '../../support/Utils'

export function negativeInteger(value: unknown): boolean {
  if (!isNumber(value)) {
    return false
  }

  return Number.isInteger(value) && value < 0
}

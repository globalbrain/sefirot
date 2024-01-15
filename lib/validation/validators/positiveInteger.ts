import { isNumber } from '../../support/Utils'

export function positiveInteger(value: unknown): boolean {
  if (!isNumber(value)) {
    return false
  }

  return Number.isInteger(value) && value > 0
}

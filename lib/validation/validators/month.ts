import { isNumber } from '../../support/Utils'

export function month(value: unknown): boolean {
  if (!isNumber(value)) { return false }

  return value > 0 && value < 13
}

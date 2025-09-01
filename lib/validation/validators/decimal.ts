import { isNumber, isString } from '../../support/Utils'

export function decimal(value: unknown): boolean {
  return isNumber(value) || (isString(value) && value.length > 0 && Number.isFinite(Number(value)))
}

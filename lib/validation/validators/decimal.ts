import { isNumber, isString } from '../../support/Utils'

export function decimal(value: unknown): boolean {
  return isNumber(value) || (isString(value) && Number.isFinite(Number(value)))
}

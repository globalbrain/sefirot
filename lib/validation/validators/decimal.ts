import { isNumber, isString } from '../../support/Utils'

const regExp = /^-?\d*(?:\.\d+)?$/

export function decimal(value: unknown): boolean {
  if (!(isString(value) || isNumber(value))) {
    return false
  }

  return regExp.test(String(value))
}

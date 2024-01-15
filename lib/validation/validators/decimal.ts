import { isString } from '../../support/Utils'

const regExp = /^[-]?\d*(\.\d+)?$/

export function decimal(value: unknown): boolean {
  if (!isString(value)) {
    return false
  }

  return regExp.test(value)
}

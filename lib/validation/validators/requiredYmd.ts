import { YmdMap, type YmdType } from '../../support/Day'
import { isYmd } from '../../support/Utils'

export function requiredYmd(value: unknown, required: YmdType[] = ['y', 'm', 'd']): boolean {
  if (!isYmd(value)) {
    return false
  }

  return required.every((r) => value[YmdMap[r]] != null)
}

import { HmsMap, type HmsType } from '../../support/Day'
import { isHms } from '../../support/Utils'

export function requiredHms(value: unknown, required: HmsType[] = ['h', 'm', 's']): boolean {
  if (!isHms(value, required)) {
    return false
  }

  return required.every((r) => value[HmsMap[r]] != null)
}

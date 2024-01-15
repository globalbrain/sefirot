import { HmsMap, type HmsType } from '../../support/Day'
import { isHms } from '../../support/Utils'

export function requiredHms(value: unknown, required: HmsType[] = ['h', 'm', 's']): boolean {
  if (!isHms(value)) {
    return false
  }

  return required.every((r) => value[HmsMap[r]] != null)
}

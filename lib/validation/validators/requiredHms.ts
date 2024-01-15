import { HmsMap, type HmsType, isHms } from '../../support/Day'

export function requiredHms(value: unknown, required: HmsType[] = ['h', 'm', 's']): boolean {
  if (!isHms(value, required)) {
    return false
  }

  return required.every((r) => value[HmsMap[r]] != null)
}

import { type Hms, HmsMap, type HmsType } from '../../support/Day'
import { hms } from './hms'

export function requiredHms(value: unknown, required: HmsType[] = ['h', 'm', 's']): boolean {
  return hms(value, required) && required.every((r) => (value as Hms)[HmsMap[r]] != null)
}

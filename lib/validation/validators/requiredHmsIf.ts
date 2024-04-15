import { type HmsType, isHms } from '../../support/Day'
import { requiredHms } from './requiredHms'
import { type RequiredIfCondition } from './requiredIf'

export async function requiredHmsIf(value: unknown, condition: RequiredIfCondition, required: HmsType[] = ['h', 'm', 's']): Promise<boolean> {
  if (typeof condition === 'boolean' && condition) {
    return requiredHms(value, required)
  }

  if (typeof condition === 'string' && condition) {
    return requiredHms(value, required)
  }

  if (typeof condition === 'function' && (await condition())) {
    return requiredHms(value, required)
  }

  return isHms(value, required)
}

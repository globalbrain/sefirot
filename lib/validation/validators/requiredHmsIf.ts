import { type HmsType } from '../../support/Day'
import { hms } from './hms'
import { type RequiredIfCondition } from './requiredIf'

export async function requiredHmsIf(
  value: unknown,
  condition: RequiredIfCondition,
  required: HmsType[] = ['h', 'm', 's']
): Promise<boolean> {
  if (
    (typeof condition === 'boolean' && condition)
    || (typeof condition === 'string' && condition)
    || (typeof condition === 'function' && (await condition()))
  ) { return hms(value, required, true) }

  return true
}

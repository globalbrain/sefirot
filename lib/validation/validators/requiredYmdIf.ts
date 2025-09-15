import { type YmdType } from '../../support/Day'
import { type RequiredIfCondition } from './requiredIf'
import { ymd } from './ymd'

export async function requiredYmdIf(
  value: unknown,
  condition: RequiredIfCondition,
  required: YmdType[] = ['y', 'm', 'd']
): Promise<boolean> {
  if (
    (typeof condition === 'boolean' && condition)
    || (typeof condition === 'string' && condition)
    || (typeof condition === 'function' && (await condition()))
  ) { return ymd(value, required, true) }

  return true
}

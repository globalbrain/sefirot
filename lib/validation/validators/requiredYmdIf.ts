import { type YmdType } from '../../support/Day'
import { type RequiredIfCondition } from './requiredIf'
import { requiredYmd } from './requiredYmd'

export async function requiredYmdIf(value: unknown, condition: RequiredIfCondition, required: YmdType[] = ['y', 'm', 'd']): Promise<boolean> {
  if (typeof condition === 'boolean' && condition) {
    return requiredYmd(value, required)
  }

  if (typeof condition === 'string' && condition) {
    return requiredYmd(value, required)
  }

  if (typeof condition === 'function' && (await condition())) {
    return requiredYmd(value, required)
  }

  return true
}

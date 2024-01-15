import { required } from './required'

export type RequiredIfCondition = boolean | string | (() => boolean) | (() => Promise<boolean>)

export async function requiredIf(value: unknown, condition: RequiredIfCondition): Promise<boolean> {
  if (typeof condition === 'boolean' && condition) {
    return required(value)
  }

  if (typeof condition === 'string' && condition) {
    return required(value)
  }

  if (typeof condition === 'function' && (await condition())) {
    return required(value)
  }

  return true
}

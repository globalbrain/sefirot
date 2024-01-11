import { helpers } from '@vuelidate/validators'

export function maxValue(value: unknown, max: number) {
  if (!helpers.req(value)) {
    return true
  }

  if (typeof value === 'string' || value instanceof Date) {
    return +value <= max
  }

  return false
}

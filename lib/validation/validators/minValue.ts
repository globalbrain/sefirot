import { helpers } from '@vuelidate/validators'

export function minValue(value: unknown, min: number) {
  if (!helpers.req(value)) {
    return true
  }

  if (typeof value === 'string' || value instanceof Date) {
    return +value >= min
  }

  return false
}

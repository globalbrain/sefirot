import { helpers } from '@vuelidate/validators'

export function maxLength(value: string, length: number): boolean {
  return !helpers.req(value) || value.length <= length
}

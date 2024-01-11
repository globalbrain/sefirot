import { helpers } from '@vuelidate/validators'

export function minLength(value: string, length: number): boolean {
  return !helpers.req(value) || value.length >= length
}

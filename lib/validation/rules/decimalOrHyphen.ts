import { decimal as baseDecimal, helpers } from '@vuelidate/validators'

export function decimalOrHyphen(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value must be valid decimal numbers or just a hyphen.',
    baseDecimal
  )
}

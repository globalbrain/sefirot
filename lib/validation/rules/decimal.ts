import { decimal as baseDecimal, helpers } from '@vuelidate/validators'

export function decimal(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value must be valid decimal numbers.',
    baseDecimal
  )
}

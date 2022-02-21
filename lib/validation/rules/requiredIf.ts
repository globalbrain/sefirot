import { helpers, requiredIf as baseRequiredIf } from '@vuelidate/validators'

export function requiredIf(
  prop: boolean | string | (() => boolean | Promise<boolean>),
  msg?: string
) {
  return helpers.withMessage(
    () => msg ?? 'The field is required.',
    baseRequiredIf(prop)
  )
}

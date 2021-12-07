import { helpers, requiredIf as baseRequiredIf } from '@vuelidate/validators'

export function requiredIf(prop: boolean | string | (() => boolean | Promise<boolean>)) {
  return helpers.withMessage('The field is required.', baseRequiredIf(prop))
}

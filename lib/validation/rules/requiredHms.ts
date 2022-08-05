import { helpers } from '@vuelidate/validators'
import { requiredHms as baseRequiredHms, Hms, HmsType } from '../validators/requiredHms'

export function requiredHms(required?: HmsType[], msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The field is required.',
    (value: Hms) => {
      return !helpers.req(value) || baseRequiredHms(value, required)
    }
  )
}
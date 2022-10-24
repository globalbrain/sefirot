import { helpers } from '@vuelidate/validators'
import { Hms, HmsType, requiredHms as baseRequiredHms } from '../validators/requiredHms'

export function requiredHms(required?: HmsType[], msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The field is required.',
    (value: Hms) => {
      return !helpers.req(value) || baseRequiredHms(value, required)
    }
  )
}

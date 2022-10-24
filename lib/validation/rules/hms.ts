import { helpers } from '@vuelidate/validators'
import { Hms, HmsType, hms as baseHms } from '../validators/hms'

export function hms(required?: HmsType[], msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The time is invalid.',
    (value: Hms) => {
      return !helpers.req(value) || baseHms(value, required)
    }
  )
}

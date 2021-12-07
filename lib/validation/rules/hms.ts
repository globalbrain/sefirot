import { helpers } from '@vuelidate/validators'
import { hms as baseHms, Hms, HmsType } from '../validators/hms'

export function hms(required?: HmsType[]) {
  return helpers.withMessage(
    'The time is invalid.',
    (value: Hms) => {
      return !helpers.req(value) || baseHms(value, required)
    }
  )
}

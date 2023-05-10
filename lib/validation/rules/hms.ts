import { helpers } from '@vuelidate/validators'
import { type Hms } from '../../support/Day'
import { hms as baseHms } from '../validators/hms'

type HmsType = 'h' | 'm' | 's'

export function hms(required?: HmsType[], msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The time is invalid.',
    (value: Hms) => {
      return !helpers.req(value) || baseHms(value, required)
    }
  )
}

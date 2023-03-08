import { helpers } from '@vuelidate/validators'
import type { Hms } from '../../support/Day'
import { requiredHms as baseRequiredHms } from '../validators/requiredHms'

type HmsType = 'h' | 'm' | 's'

export function requiredHms(required?: HmsType[], msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The field is required.',
    (value: Hms) => {
      return !helpers.req(value) || baseRequiredHms(value, required)
    }
  )
}

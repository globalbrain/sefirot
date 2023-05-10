import { helpers } from '@vuelidate/validators'
import { type Ymd } from '../../support/Day'
import { requiredYmd as baseRequiredYmd } from '../validators/requiredYmd'

type YmdType = 'y' | 'm' | 'd'

export function requiredYmd(required?: YmdType[], msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The field is required.',
    (value: Ymd) => {
      return !helpers.req(value) || baseRequiredYmd(value, required)
    }
  )
}

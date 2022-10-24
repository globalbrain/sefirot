import { helpers } from '@vuelidate/validators'
import { Ymd, YmdType, requiredYmd as baseRequiredYmd } from '../validators/requiredYmd'

export function requiredYmd(required?: YmdType[], msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The field is required.',
    (value: Ymd) => {
      return !helpers.req(value) || baseRequiredYmd(value, required)
    }
  )
}

import { helpers } from '@vuelidate/validators'
import { ymd as baseYmd, Ymd, YmdType } from '../validators/ymd'

export function ymd(required?: YmdType[], msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The date is invalid.',
    (value: Ymd) => {
      return !helpers.req(value) || baseYmd(value, required)
    }
  )
}

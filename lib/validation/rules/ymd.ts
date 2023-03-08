import { helpers } from '@vuelidate/validators'
import type { Ymd } from '../../support/Day'
import { ymd as baseYmd } from '../validators/ymd'

type YmdType = 'y' | 'm' | 'd'

export function ymd(required?: YmdType[], msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The date is invalid.',
    (value: Ymd) => {
      return !helpers.req(value) || baseYmd(value, required)
    }
  )
}

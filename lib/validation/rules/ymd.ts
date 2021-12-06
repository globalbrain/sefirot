import { helpers, maxLength as baseMaxLength } from '@vuelidate/validators'
import ymdBase, { YmdType } from '../validators/ymd'

function ymd(required?: YmdType[]) {
  return helpers.withMessage(
    ({ $params }) => {
      return 'The date is invalid.'
    },
    baseMaxLength(length)
  )
}

export { ymd }

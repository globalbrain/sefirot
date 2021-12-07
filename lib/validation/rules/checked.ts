import { helpers } from '@vuelidate/validators'
import { checked as baseChecked } from '../validators/checked'

export const checked = helpers.withMessage(
  'You must check the field.',
  (value: boolean) => !helpers.req(value) || baseChecked(value)
)

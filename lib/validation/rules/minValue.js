import { helpers, minValue as minValueBase } from 'vuelidate/lib/validators'

export default function minValue (min, msg) {
  return helpers.withParams({ type: 'minValue', msg }, minValueBase(min))
}

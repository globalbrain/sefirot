import { helpers, numeric as numericBase } from 'vuelidate/lib/validators'

export default function numeric (msg) {
  return helpers.withParams({ type: 'numeric', msg }, numericBase)
}

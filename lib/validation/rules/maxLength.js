import { helpers, maxLength as ml } from 'vuelidate/lib/validators'

export default function required (max, msg) {
  return helpers.withParams({ type: 'maxLength', msg }, ml(max))
}

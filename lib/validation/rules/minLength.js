import { helpers, minLength as ml } from 'vuelidate/lib/validators'

export default function required (min, msg) {
  return helpers.withParams({ type: 'minLength', msg }, ml(min))
}

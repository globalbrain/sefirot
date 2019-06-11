import { helpers, email as em } from 'vuelidate/lib/validators'

export default function required (msg) {
  return helpers.withParams({ type: 'email', msg }, em)
}

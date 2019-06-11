import { helpers, required as req } from 'vuelidate/lib/validators'

export default function required (msg) {
  return helpers.withParams({ type: 'required', msg }, req)
}

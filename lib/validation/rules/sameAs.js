import { helpers, sameAs as sa } from 'vuelidate/lib/validators'

export default function required (locator, msg) {
  return helpers.withParams({ type: 'sameAs', msg }, sa(locator))
}

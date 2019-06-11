import { helpers, url as urlBase } from 'vuelidate/lib/validators'

export default function url (msg) {
  return helpers.withParams({ type: 'url', msg }, urlBase)
}

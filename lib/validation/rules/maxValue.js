import { helpers, maxValue as maxValueBase } from 'vuelidate/lib/validators'

export default function maxValue (max, msg) {
  return helpers.withParams({ type: 'maxValue', msg }, maxValueBase(max))
}

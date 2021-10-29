import { checked as baseChecked } from '../validators'
import { Rule } from './'

export default function checked(message?: string): Rule {
  return {
    name: 'checked',
    message: message ?? 'You must check the field.',
    optional: true,
    validate: baseChecked
  }
}

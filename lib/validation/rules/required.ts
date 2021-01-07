import { required as baseRequired } from '../validators'
import { Rule } from './'

export default function required(message?: string): Rule {
  return {
    name: 'required',
    message: message ?? 'The field is required.',
    optional: false,
    validate: baseRequired
  }
}

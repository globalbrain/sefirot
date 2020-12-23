import { email as baseEmail } from '../validators'
import { Rule } from './'

export default function email (message?: string): Rule {
  return {
    name: 'email',
    message: message ?? 'The Email address is invalid.',
    optional: true,
    validate: baseEmail
  }
}

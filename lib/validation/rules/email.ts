import { email as baseEmail } from '../validators'
import { Rule } from './'

export default function email (message: string): Rule {
  return {
    name: 'email',
    message,
    optional: true,
    validate: baseEmail
  }
}

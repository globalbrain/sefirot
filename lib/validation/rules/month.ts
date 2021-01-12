import { month as baseMonth } from '../validators'
import { Rule } from './'

export default function month(message?: string): Rule {
  return {
    name: 'month',
    message: message ?? 'The month is invalid.',
    optional: true,
    validate: baseMonth
  }
}

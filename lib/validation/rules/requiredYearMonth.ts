import { requiredYearMonth as baseRequiredYearMonth } from '../validators'
import { Rule } from './'

export default function requiredYearMonth(message?: string): Rule {
  return {
    name: 'requiredYearMonth',
    message: message ?? 'The field is required.',
    optional: true,
    validate: baseRequiredYearMonth
  }
}

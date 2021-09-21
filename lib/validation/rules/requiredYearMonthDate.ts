import { requiredYearMonthDate as baseRequiredYearMonthDate } from '../validators'
import { Rule } from './'

export default function requiredYearMonthDate(message?: string): Rule {
  return {
    name: 'requiredYearMonthDate',
    message: message ?? 'The field is required.',
    optional: true,
    validate: baseRequiredYearMonthDate
  }
}

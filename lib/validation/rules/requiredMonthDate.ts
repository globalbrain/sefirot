import { requiredMonthDate as baseRequiredMonthDate } from '../validators'
import { Rule } from './'

export default function requiredMonthDate(message?: string): Rule {
  return {
    name: 'requiredMonthDate',
    message: message ?? 'The field is required.',
    optional: true,
    validate: baseRequiredMonthDate
  }
}

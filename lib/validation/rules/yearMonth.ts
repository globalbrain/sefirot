import { yearMonth as baseYearMonth } from '../validators'
import { Rule } from './'

export default function yearMonth(message?: string): Rule {
  return {
    name: 'yearMonth',
    message: message ?? 'The date is invalid.',
    optional: true,
    validate: baseYearMonth
  }
}

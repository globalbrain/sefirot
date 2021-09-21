import { yearMonthDate as baseYearMonthDate } from '../validators'
import { Rule } from './'

export default function year(message?: string): Rule {
  return {
    name: 'yearMonthDate',
    message: message ?? 'The date is invalid.',
    optional: true,
    validate: baseYearMonthDate
  }
}

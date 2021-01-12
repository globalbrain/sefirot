import { day as baseDay } from '../validators'
import { Rule } from './'

export default function day(year?: string, month?: string, message?: string): Rule {
  return {
    name: 'day',
    message: message ?? 'The Date is invalid.',
    optional: true,
    validate: (value, data) => baseDay(value, data[year!], data[month!])
  }
}

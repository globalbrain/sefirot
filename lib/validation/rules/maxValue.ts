import { maxValue as baseMaxValue } from '../validators'
import { Rule } from './'

export default function maxValue(max: string, message?: string): Rule {
  return {
    name: 'maxValue',
    message: message ?? `The value must be ${max} or less.`,
    optional: true,
    validate: (value, data) => baseMaxValue(value, data[max])
  }
}

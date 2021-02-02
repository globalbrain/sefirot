import { maxLength as baseMaxLength } from '../validators'
import { Rule } from './'

export default function maxLength(max: string, message?: string): Rule {
  return {
    name: 'maxLength',
    message: message ?? `The value must be ${max} words or less.`,
    optional: true,
    validate: (value, data) => baseMaxLength(value, data[max])
  }
}

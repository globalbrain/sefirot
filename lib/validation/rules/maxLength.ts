import { maxLength as baseMaxLength } from '../validators'
import { Rule } from './'

export default function maxLength(max: string, message?: string): Rule {
  return {
    name: 'maxLength',
    message: message ?? `The value must be less than ${max} characters.`,
    optional: true,
    validate: (value, data) => baseMaxLength(value, data[max])
  }
}

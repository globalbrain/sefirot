import { maxLength as baseMaxLength } from '../validators'
import { Rule } from './'

export default function maxLength(max: number, message?: string): Rule {
  return {
    name: 'maxLength',
    message: message ?? `The value must be less than ${max} characters.`,
    optional: true,
    validate: value => baseMaxLength(value, max)
  }
}

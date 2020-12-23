import { regex as baseRegex } from '../validators'
import { Rule } from './'

export default function required (regExp: RegExp, message?: string): Rule {
  return {
    name: 'regex',
    message: message ?? 'The value is invalid.',
    optional: true,
    validate: value => baseRegex(value, regExp)
  }
}

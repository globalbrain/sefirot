import { regex as baseRegex } from '../validators'
import { Rule } from './'

export default function required (regExp: RegExp, message: string): Rule {
  return {
    name: 'regex',
    message,
    optional: false,
    validate: value => baseRegex(value, regExp)
  }
}

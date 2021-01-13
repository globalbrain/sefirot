import { include as baseInclude } from '../validators'
import { Rule } from './'

export default function required(other: string, message?: string): Rule {
  return {
    name: 'include',
    message: message ?? `The value must include ${other}.`,
    optional: true,
    validate: (value, data) => baseInclude(value, data[other])
  }
}

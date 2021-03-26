import { includeSome as baseIncludeSome } from '../validators'
import { Rule } from './'

export default function required(other: string, message?: string): Rule {
  return {
    name: 'includeSome',
    message: message ?? `The value must include some of ${other}.`,
    optional: true,
    validate: (value, data) => baseIncludeSome(value, data[other])
  }
}

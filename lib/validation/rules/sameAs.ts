import { sameAs as baseSameAs } from '../validators'
import { Rule } from './'

export default function required(other: string, message?: string): Rule {
  return {
    name: 'sameAs',
    message: message ?? `The value must match ${other}.`,
    optional: true,
    validate: (value, data) => baseSameAs(value, data[other])
  }
}

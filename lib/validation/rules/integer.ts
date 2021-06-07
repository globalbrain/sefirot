import { integer as baseInteger } from '../validators'
import { Rule } from './'

export default function integer(message?: string): Rule {
  return {
    name: 'maxValue',
    message: message ?? 'The value must not contain decimals.',
    optional: true,
    validate: baseInteger
  }
}

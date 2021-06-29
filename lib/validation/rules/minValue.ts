import { minValue as baseMinValue } from '../validators'
import { Rule } from './'

export default function minValue(min: number, message?: string): Rule {
  return {
    name: 'minValue',
    message: message ?? `The value must be ${min} or more.`,
    optional: true,
    validate: value => baseMinValue(value, min)
  }
}

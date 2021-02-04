import { required } from '../validators'
import { Rule } from './'

export default function requiredIf(locator: string, message?: string): Rule {
  return {
    name: 'requiredIf',
    message: message ?? 'The field is required.',
    optional: false,
    validate(value, data) {
      return data[locator] ? required(value) : true
    }
  }
}

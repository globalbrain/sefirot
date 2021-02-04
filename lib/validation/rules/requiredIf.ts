import { required } from '../validators'
import { Rule, Locator, locate } from './'

export default function requiredIf(locator: Locator, message?: string): Rule {
  return {
    name: 'requiredIf',
    message: message ?? 'The field is required.',
    optional: false,
    validate(value, data) {
      return locate(data, locator) ? required(value) : true
    }
  }
}

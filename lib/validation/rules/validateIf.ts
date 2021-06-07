import { required } from '../validators'
import { Rule, Locator, locate } from './'

export default function validateIf(locator: Locator, rules: Rule[]): Rule {
  return {
    name: 'validateIf',
    message: 'Default message.',
    optional: false,
    validate(value, data) {
      if (!locate(data, locator)) {
        return true
      }

      return rules.every((rule) => {
        if (rule.optional && !required(value)) {
          return true
        }

        const result = rule.validate(value, data)

        this.message = rule.message

        return result
      })
    }
  }
}

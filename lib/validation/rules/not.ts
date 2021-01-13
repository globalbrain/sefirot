import { Rule } from './'

export default function not(rule: Rule, message?: string): Rule {
  return {
    name: `not-${rule.name}`,
    message: message ?? '',
    optional: true,
    validate: (value, data) => !rule.validate(value, data)
  }
}

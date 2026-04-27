import { type ValidationArgs, type ValidationRuleWithParams } from '@vuelidate/core'
import { type Day, day } from '../../../support/Day'
import { after, afterOrEqual, before, beforeOrEqual, maxLength, required } from '../../../validation/rules'
import { type Rule } from '../Rule'

/**
 * Maps field rules to vuelidate validation rules.
 */
export function map(rules: Rule[]): ValidationArgs {
  return rules.reduce((carry: ValidationArgs<any>, rule: Rule) => {
    carry[rule.type] = mapRule(rule)
    return carry
  }, {})
}

function mapRule(rule: Rule): ValidationRuleWithParams {
  switch (rule.type) {
    case 'max_length':
      return maxLength(rule.length)
    case 'required':
      return required()
    case 'before':
      return before(resolveDate(rule.date))
    case 'before_or_equal':
      return beforeOrEqual(resolveDate(rule.date))
    case 'after':
      return after(resolveDate(rule.date))
    case 'after_or_equal':
      return afterOrEqual(resolveDate(rule.date))
  }
}

/**
 * Resolves a date string from the backend rule definition into a `Day`. The
 * keywords mirror the relative date strings accepted by Laravel's `before`
 * and `after` validators.
 */
function resolveDate(date: string): Day {
  switch (date) {
    case 'now':
      return day()
    case 'today':
      return day().startOf('day')
    case 'tomorrow':
      return day().add(1, 'day').startOf('day')
    case 'yesterday':
      return day().subtract(1, 'day').startOf('day')
    default:
      return day(date)
  }
}

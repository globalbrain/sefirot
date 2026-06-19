import { type ValidationArgs, type ValidationRuleWithParams } from '@vuelidate/core'
import { type Day, day } from '../../../support/Day'
import {
  after,
  afterOrEqual,
  before,
  beforeOrEqual,
  maxLength,
  required,
  slackChannelLink,
  slackChannelName
} from '../../../validation/rules'
import { type Rule } from '../Rule'

/**
 * Maps field rules to vuelidate validation rules.
 */
export function map(rules: Rule[]): ValidationArgs {
  return rules.reduce((carry: ValidationArgs<any>, rule: Rule) => {
    const mapped = mapRule(rule)
    if (mapped) {
      carry[rule.type] = mapped
    }
    return carry
  }, {})
}

function mapRule(rule: Rule): ValidationRuleWithParams | null {
  switch (rule.type) {
    case 'max_length':
      return maxLength(rule.length)
    case 'required':
      return required()
    case 'unique':
      // Uniqueness can only be verified server-side (it queries the
      // database). The backend enforces it and returns a 422 with field
      // errors, so there is no client-side equivalent to apply here.
      return null
    case 'slack_channel_link':
      return slackChannelLink()
    case 'slack_channel_name':
      return slackChannelName({ offset: rule.offset })
    case 'before':
      return before(resolveDate(rule.date))
    case 'before_or_equal':
      return beforeOrEqual(resolveDate(rule.date))
    case 'after':
      return after(resolveDate(rule.date))
    case 'after_or_equal':
      return afterOrEqual(resolveDate(rule.date))
    default: {
      const _exhaustive: never = rule
      throw new Error(`Unsupported rule type: ${(_exhaustive as Rule).type}`)
    }
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
    default: {
      const parsed = day(date)
      if (!parsed.isValid()) {
        throw new Error(`Invalid date string in validation rule: "${date}"`)
      }
      return parsed
    }
  }
}

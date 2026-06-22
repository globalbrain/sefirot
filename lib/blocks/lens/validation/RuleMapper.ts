import { type ValidationArgs, type ValidationRuleWithParams } from '@vuelidate/core'
import { type Day, day } from '../../../support/Day'
import {
  after,
  afterOrEqual,
  before,
  beforeOrEqual,
  checked,
  decimal,
  decimalOrHyphen,
  email,
  maxLength,
  maxValue,
  minLength,
  minValue,
  negativeInteger,
  positiveInteger,
  required,
  rule,
  slackChannelLink,
  slackChannelName,
  url,
  zeroOrNegativeInteger,
  zeroOrPositiveInteger
} from '../../../validation/rules'
import { type EachRule, type Rule } from '../Rule'

/**
 * Maps field rules to vuelidate validation rules.
 */
export function map(rules: Rule[]): ValidationArgs {
  return rules.reduce((carry: ValidationArgs<any>, rule: Rule) => {
    // `each` validates every element of an array value rather than the value
    // itself, so it maps to a single validator that runs the nested rules over
    // each element (see `mapEach`).
    if (rule.type === 'each') {
      carry.each = mapEach(rule)
      return carry
    }
    const mapped = mapRule(rule)
    if (mapped) {
      carry[rule.type] = mapped
    }
    return carry
  }, {})
}

/**
 * Builds a validator that applies an `each` rule's nested rules to every
 * element of an array value. vuelidate's `forEach` only handles arrays of
 * objects, so for the scalar arrays Lens fields hold (multi-select values,
 * related ids) we run each element through the mapped child validators
 * directly. Mirrors the backend, which expands the same rules onto Laravel's
 * `key.*` wildcard. A non-array value fails; an empty/absent value is left to
 * `required` (the rule is optional on its own).
 */
function mapEach(eachRule: EachRule): ValidationRuleWithParams {
  // Map each child rule straight to a validator rather than through the
  // type-keyed `map()` object, so two child rules of the same family are both
  // kept (the backend's `key.*` expansion is additive and de-dupes nothing).
  // Server-only children (e.g. `unique`) map to null and are dropped.
  const childValidators = eachRule.rules
    .map((r) => (r.type === 'each' ? mapEach(r) : mapRule(r)))
    .filter((v): v is ValidationRuleWithParams => v !== null)

  return rule((value) =>
    Array.isArray(value)
    && value.every((item) => childValidators.every((v) => v.$validator(item, {}, {}) === true))
  )
}

function mapRule(rule: Exclude<Rule, EachRule>): ValidationRuleWithParams | null {
  switch (rule.type) {
    case 'max_length':
      return maxLength(rule.length)
    case 'min_length':
      return minLength(rule.length)
    case 'min_value':
      return minValue(rule.value)
    case 'max_value':
      return maxValue(rule.value)
    case 'required':
      return required()
    case 'unique':
      // Uniqueness can only be verified server-side (it queries the
      // database). The backend enforces it and returns a 422 with field
      // errors, so there is no client-side equivalent to apply here.
      return null
    case 'email':
      return email()
    case 'url':
      return url()
    case 'decimal':
      return decimal()
    case 'decimal_or_hyphen':
      return decimalOrHyphen()
    case 'positive_integer':
      return positiveInteger()
    case 'negative_integer':
      return negativeInteger()
    case 'zero_or_positive_integer':
      return zeroOrPositiveInteger()
    case 'zero_or_negative_integer':
      return zeroOrNegativeInteger()
    case 'checked':
      return checked()
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

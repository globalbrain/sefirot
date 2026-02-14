import { type ValidationArgs, type ValidationRuleWithParams } from '@vuelidate/core'
import { maxLength, required } from '../../../validation/rules'
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
  }
}

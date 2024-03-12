import { type ValidationRuleWithParams } from '@vuelidate/core'
import { type MessageProps as VMessageProps, helpers } from '@vuelidate/validators'
import { type Lang, useLang } from '../composables/Lang'
import { _required } from './validators'

export interface RuleOptions {
  optional?: boolean
  async?: boolean
  message(params: MessageProps): string
  validation(value: unknown): boolean | Promise<boolean>
}

export interface MessageProps extends VMessageProps {
  lang: Lang
}

export function createRule(
  options: RuleOptions
): ValidationRuleWithParams {
  const lang = useLang()

  function validation(value: unknown) {
    return options.optional && !_required(value)
      ? true
      : options.validation(value)
  }

  return helpers.withMessage(
    (params) => options.message({ ...params, lang }),
    options.async ? helpers.withAsync(validation) : validation
  )
}

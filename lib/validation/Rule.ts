import { type ValidationRuleWithParams } from '@vuelidate/core'
import { type MessageProps as VMessageProps, helpers } from '@vuelidate/validators'
import { type Lang } from '../composables/Lang'
import { required } from './validators'

export interface RuleOptions {
  optional?: boolean
  async?: boolean
  params?: Record<string, any>
  message(params: MessageProps): string
  validation(value: unknown): boolean | Promise<boolean>
}

export interface MessageProps extends VMessageProps {
  lang: Lang
}

export function createRule(options: RuleOptions): ValidationRuleWithParams {
  const lang = typeof document !== 'undefined'
    ? (document.documentElement.lang === 'ja' ? 'ja' : 'en')
    : 'en'

  const params = options.params ?? {}

  const validator = helpers.withParams(params, (value: unknown) => {
    return options.optional && !required(value, false) ? true : options.validation(value)
  })

  return helpers.withMessage(
    (params) => options.message({ ...params, lang }),
    options.async ? helpers.withAsync(validator, Object.values(params)) : validator
  )
}

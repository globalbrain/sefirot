import { type ValidationRuleWithParams } from '@vuelidate/core'
import { type MessageProps as VMessageProps, helpers } from '@vuelidate/validators'
import { type Lang, useLang } from '../composables/Lang'
import { _required } from './validators'

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

export function createRule(
  options: RuleOptions
): ValidationRuleWithParams {
  const lang = useLang()

  const params = options.params ?? {}

  const validator = helpers.withParams(
    params,
    (value: unknown) => {
      return options.optional && !_required(value)
        ? true
        : options.validation(value)
    }
  )

  return helpers.withMessage(
    (params) => options.message({ ...params, lang }),
    options.async
      ? helpers.withAsync(validator, createParamsForAsyncValidator(params))
      : validator
  )
}

function createParamsForAsyncValidator(params: Record<string, any>) {
  return Object.keys(params).map((key) => {
    return params[key]
  })
}

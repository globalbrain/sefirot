import { helpers } from '@vuelidate/validators'
import { createRule } from '../Rule'

export const message = {
  en: 'The value is invalid.',
  ja: 'この値は正しくありません。'
}

export function rule(validation: (value: unknown) => boolean, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value) => !helpers.req(value) || validation(value)
  })
}

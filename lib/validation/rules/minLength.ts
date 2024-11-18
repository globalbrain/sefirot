import { format } from '../../support/Num'
import { createRule } from '../Rule'
import { minLength as baseMinLength } from '../validators'

export const message = {
  en: (min: string) => `The value must be greater than or equal to ${min} characters.`,
  ja: (min: string) => `この値は最小${min}文字です。`
}

export function minLength(length: number, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](format(length)),
    optional: true,
    validation: (value) => baseMinLength(value, length)
  })
}

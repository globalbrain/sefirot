import { format } from '../../support/Num'
import { createRule } from '../Rule'
import { maxLength as baseMaxLength } from '../validators'

export const message = {
  en: (length: string) => `The value must be less than or equal to ${length} characters.`,
  ja: (length: string) => `この値は最大${length}文字までです。`
}

export function maxLength(length: number, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](format(length)),
    optional: true,
    validation: (value) => baseMaxLength(value, length)
  })
}

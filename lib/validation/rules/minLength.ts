import { createRule } from '../Rule'
import { minLength as baseMinLength } from '../validators'

export const message = {
  en: (min: number) => `The value must be greater than or equal to ${min} characters.`,
  ja: (min: number) => `この値は最小${min}文字です。`
}

export function minLength(length: number, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](length),
    validation: (value: string) => baseMinLength(value, length)
  })
}

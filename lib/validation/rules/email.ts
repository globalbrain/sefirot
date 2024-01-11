import { createRule } from '../Rule'
import { email as baseEmail } from '../validators'

export const message = {
  en: 'The Email is invalid.',
  ja: 'メールアドレスが正しくありません。'
}

export function email(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value: string) => baseEmail(value)
  })
}

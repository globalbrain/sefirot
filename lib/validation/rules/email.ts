import { createRule } from '../Rule'
import { email as baseEmail } from '../validators'

export const message = {
  en: 'The email is invalid.',
  ja: 'Emailの形式が正しくありません。'
}

export function email(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: baseEmail
  })
}

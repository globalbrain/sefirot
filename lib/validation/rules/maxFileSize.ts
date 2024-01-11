import { helpers } from '@vuelidate/validators'
import { createRule } from '../Rule'
import { maxFileSize as baseMaxFileSize } from '../validators/maxFileSize'

export const message = {
  en: (size: string) => `The file must be smaller than or equal to ${size}.`,
  ja: (size: string) => `ファイルは${size}よりも小さい必要があります。`
}

export function maxFileSize(size: string, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](size),
    validation: (value: File) => !helpers.req(value) || baseMaxFileSize(value, size)
  })
}

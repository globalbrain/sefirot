import { createRule } from '../Rule'
import { mimeTypes as baseMimeTypes } from '../validators/mimeTypes'

export const message = {
  en: 'The file type is invalid.',
  ja: 'ファイル形式が正しくありません。'
}

export function mimeTypes(patterns: string[], msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => baseMimeTypes(value, patterns)
  })
}

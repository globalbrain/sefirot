import { createRule } from '../Rule'
import { fileExtension as baseFileExtension } from '../validators/fileExtension'

export const message = {
  en: 'The file extension is invalid.',
  ja: 'ファイル拡張子が正しくありません。'
}

export function fileExtension(extensions: string[], msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => baseFileExtension(value, extensions)
  })
}

import { createRule } from '../Rule'
import { maxTotalFileSize as baseMaxTotalFileSize } from '../validators/maxTotalFileSize'

export const message = {
  en: (size: string) => `The total file size must be smaller than or equal to ${size}.`,
  ja: (size: string) => `合計ファイルサイズは最大${size}までです。`
}

export function maxTotalFileSize(size: string, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](size),
    optional: true,
    validation: (value) => baseMaxTotalFileSize(value, size)
  })
}

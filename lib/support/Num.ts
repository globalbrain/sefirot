export function format(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 20 })
}

export function abbreviate(value: number, precision = 0, lang: 'en' | 'ja' = 'en'): string {
  const locale = lang === 'ja' ? 'ja-JP' : 'en-US'
  return value.toLocaleString(locale, {
    notation: 'compact',
    maximumFractionDigits: precision
  })
}

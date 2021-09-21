export interface YearMonth {
  year?: number
  month?: number
}

export default function yearMonth(value: YearMonth): boolean {
  if (value.year === undefined || value.month === undefined) {
    return true
  }

  if (value.year < 0 || value.year > 9999) {
    return false
  }

  if (value.month < 0 || value.month > 12) {
    return false
  }

  return true
}

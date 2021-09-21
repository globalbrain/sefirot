export interface YearMonth {
  year?: number
  month?: number
}

export default function requiredYearMonth(value: YearMonth): boolean {
  return !(value.year === undefined || value.month === undefined)
}

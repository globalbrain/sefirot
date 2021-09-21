export interface YearMonthDate {
  year?: number
  month?: number
  date?: number
}

export default function requiredYearMonthDate(value: YearMonthDate): boolean {
  return !(value.year === undefined || value.month === undefined || value.date === undefined)
}

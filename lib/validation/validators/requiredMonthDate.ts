export interface MonthDate {
  month?: number
  date?: number
}

export default function requiredMonthDate(value: MonthDate): boolean {
  return !(value.month === undefined || value.date === undefined)
}

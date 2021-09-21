import day from 'dayjs'

export interface YearMonthDate {
  year?: number
  month?: number
  date?: number
}

export default function yearMonthDate(value: YearMonthDate): boolean {
  if (value.year === undefined || value.month === undefined || value.date === undefined) {
    return true
  }

  const d = day(new Date(value.year, value.month - 1, value.date))

  if (d.month() + 1 !== value.month) {
    return false
  }

  return d.isValid()
}

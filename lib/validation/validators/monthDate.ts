import day from 'dayjs'

export interface MonthDate {
  month?: number
  date?: number
}

export default function monthDate(value: MonthDate): boolean {
  if (value.month === undefined || value.date === undefined) {
    return true
  }

  const d = day(new Date(2020, value.month - 1, value.date))

  if (d.month() + 1 !== value.month) {
    return false
  }

  return d.isValid()
}

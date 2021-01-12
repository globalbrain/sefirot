import dayjs from 'dayjs'

export default function day(value: number, year?: number, month?: number): boolean {
  if (year && !month) {
    return validateDateOnly(value)
  }

  if (!year && month) {
    return validateWithMonth(month, value)
  }

  if (year && month) {
    return validateWithYearMonth(year, month, value)
  }

  return validateDateOnly(value)
}

function validateDateOnly(date: number): boolean {
  return date > 0 && date < 32
}

function validateWithMonth(month: number, date: number): boolean {
  return dayjs().year(2020).month(month - 1).date(date).date() === date
}

function validateWithYearMonth(year: number, month: number, date: number): boolean {
  return dayjs().year(year).month(month - 1).date(date).date() === date
}

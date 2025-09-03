import { type YmdType } from '../../support/Day'
import { isObject } from '../../support/Utils'

export function ymd(value: unknown, required: YmdType[] = ['y', 'm', 'd'], rejectNull = false): boolean {
  if (!isObject(value)) { return false }

  const { year, month, day: date } = value
  const requiredSet = new Set(required)

  if (
    !isValidPart(year, requiredSet.has('y'), 1000, 2999)
    || !isValidPart(month, requiredSet.has('m'), 1, 12)
    || !isValidPart(date, requiredSet.has('d'), 1, 31)
  ) { return false }

  const now = new Date()
  const y = year ?? now.getFullYear()
  const m = month ?? (year ? 1 : now.getMonth() + 1)
  const d = date ?? ((year || month) ? 1 : now.getDate())

  const dt = new Date(y, m - 1, d)
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d

  function isValidPart(v: unknown, req: boolean, min: number, max: number): v is number | null | undefined {
    if (v === undefined) { return !req }
    if (v === null) { return !rejectNull || !req }
    return Number.isInteger(v) && v >= min && v <= max
  }
}

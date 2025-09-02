import { type HmsType } from '../../support/Day'
import { isObject } from '../../support/Utils'

const hourRE = /^(?:[01]?\d|2[0-3])$/
const minuteAndSecondRE = /^[0-5]?\d$/

export function hms(value: unknown, required: HmsType[] = ['h', 'm', 's'], rejectNull = false): boolean {
  if (!isObject(value)) { return false }

  const { hour, minute, second, ...rest } = value
  if (Object.keys(rest).length > 0) { return false }

  const requiredSet = new Set(required)

  return (
    isValidPart(hour, requiredSet.has('h'), hourRE)
    && isValidPart(minute, requiredSet.has('m'), minuteAndSecondRE)
    && isValidPart(second, requiredSet.has('s'), minuteAndSecondRE)
  )

  function isValidPart(v: unknown, req: boolean, re: RegExp): v is string | null | undefined {
    if (v === undefined) { return !req }
    if (v === null) { return !rejectNull || !req }
    return typeof v === 'string' && re.test(v)
  }
}

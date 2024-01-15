import { type Hms, HmsMap, type Ymd, YmdMap } from './Day'

export function isNullish(value: unknown): value is undefined | null {
  return value === null || value === undefined
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !isArray(value)
}

export function isFile(value: unknown): value is File {
  return value instanceof File
}

export function isYmd(value: unknown): value is Ymd {
  return (
    value !== null
    && typeof value === 'object'
    && Object.values(YmdMap).every((v) => Object.hasOwn(value, v))
  )
}

export function isHms(value: unknown): value is Hms {
  return (
    value !== null
    && typeof value === 'object'
    && Object.values(HmsMap).every((v) => Object.hasOwn(value, v))
  )
}

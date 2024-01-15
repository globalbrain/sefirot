import { type Hms, HmsMap, type HmsType, type Ymd, YmdMap, type YmdType } from './Day'

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

export function isYmd(value: unknown, required: YmdType[] = ['y', 'm', 'd']): value is Ymd {
  if (!isObject(value)) {
    return false
  }

  return required
    .reduce<string[]>((keys, type) => {
      keys.push(YmdMap[type])
      return keys
    }, [])
    .every((key) => value[key] === null || isNumber(value[key]))
}

export function isHms(value: unknown, required: HmsType[] = ['h', 'm', 's']): value is Hms {
  if (!isObject(value)) {
    return false
  }

  return required
    .reduce<string[]>((keys, type) => {
      keys.push(HmsMap[type])
      return keys
    }, [])
    .every((key) => value[key] === null || isString(value[key]))
}

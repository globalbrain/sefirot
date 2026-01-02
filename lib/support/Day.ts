import dayjs, { type ConfigType, type Dayjs } from 'dayjs'
import PluginRelativeTime from 'dayjs/plugin/relativeTime'
import PluginTimezone from 'dayjs/plugin/timezone'
import PluginUtc from 'dayjs/plugin/utc'

dayjs.extend(PluginUtc)
dayjs.extend(PluginTimezone)
dayjs.extend(PluginRelativeTime)

export type Day = Dayjs
export type Input = ConfigType

/**
 * The year, month, and date object interface.
 */
export interface Ymd {
  year: number | null
  month: number | null
  date: number | null
}

export type YmdType = 'y' | 'm' | 'd'

/**
 * The hour, minute, and second object interface.
 */
export interface Hms {
  hour: string | null
  minute: string | null
  second: string | null
}

export type HmsType = 'h' | 'm' | 's'

export function day(input?: Input): Day {
  return dayjs(input)
}

export function utc(input?: Input): Day {
  return dayjs.utc(input)
}

export function tz(input?: Input, timezone?: string): Day {
  return dayjs.tz(input, timezone)
}

/**
 * Creates a new `Ymd` object.
 */
export function createYmd(year?: number | null, month?: number | null, date?: number | null): Ymd
export function createYmd(day?: Day | null): Ymd
export function createYmd(
  yearOrDay: number | Day | null = null,
  month: number | null = null,
  date: number | null = null
): Ymd {
  return isDay(yearOrDay)
    ? { year: yearOrDay.year(), month: yearOrDay.month() + 1, date: yearOrDay.date() }
    : { year: yearOrDay, month, date }
}

/**
 * Creates a new `Hms` object.
 */
export function createHms(hour?: string | null, minute?: string | null, second?: string | null): Hms
export function createHms(day?: Day | null): Hms
export function createHms(
  hourOrDay: string | Day | null = null,
  minute: string | null = null,
  second: string | null = null
): Hms {
  return isDay(hourOrDay)
    ? { hour: hourOrDay.format('HH'), minute: hourOrDay.format('mm'), second: hourOrDay.format('ss') }
    : { hour: hourOrDay, minute, second }
}

export function isDay(value: unknown): value is Day {
  return dayjs.isDayjs(value)
}

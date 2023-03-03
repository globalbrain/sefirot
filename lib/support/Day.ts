import type { ConfigType, Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import PluginRelativeTime from 'dayjs/plugin/relativeTime'
import PluginTimezone from 'dayjs/plugin/timezone'
import PluginUtc from 'dayjs/plugin/utc'

export type Day = Dayjs
export type Input = ConfigType

dayjs.extend(PluginUtc)
dayjs.extend(PluginTimezone)
dayjs.extend(PluginRelativeTime)

export function day(input?: Input): Day {
  return dayjs(input)
}

export function utc(input?: Input): Day {
  return dayjs.utc(input)
}

export function tz(input?: Input, timezone?: string): Day {
  return dayjs.tz(input, timezone)
}

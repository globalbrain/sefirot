import dayjs, { ConfigType, Dayjs } from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime.js'

export type Day = Dayjs
export type Input = ConfigType

dayjs.extend(RelativeTime)

export function day(input?: Input): Dayjs {
  return dayjs(input)
}

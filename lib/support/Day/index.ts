import dayjs, { ConfigType, Dayjs } from 'dayjs'
import { relativeTime } from './plugins/RelativeTime'

export type Day = Dayjs
export type Input = ConfigType

dayjs.extend(relativeTime)

export function day(input?: Input): Day {
  return dayjs(input)
}

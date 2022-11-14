import dayjs, { ConfigType, Dayjs } from 'dayjs/esm'
import RelativeTime from 'dayjs/esm/plugin/relativeTime'

export type Day = Dayjs
export type Input = ConfigType

dayjs.extend(RelativeTime)

export function day(input?: Input): Dayjs {
  return dayjs(input)
}

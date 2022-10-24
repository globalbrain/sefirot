import dayjs, { ConfigType, Dayjs } from 'dayjs'

export type Day = Dayjs
export type Input = ConfigType

export function day(input: Input): Dayjs {
  return dayjs(input)
}

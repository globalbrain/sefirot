import { type Ymd, YmdMap, type YmdType } from '../../support/Day'
import { ymd } from './ymd'

export function requiredYmd(value: unknown, required: YmdType[] = ['y', 'm', 'd']): boolean {
  return ymd(value, required) && required.every((r) => (value as Ymd)[YmdMap[r]] != null)
}

import { Ymd, YmdMap, YmdType } from './ymd'

export type { Ymd, YmdType, YmdMap }

export function requiredYmd(ymd: Ymd, required: YmdType[] = ['y', 'm', 'd']): boolean {
  return required.every((r) => ymd[YmdMap[r]] != null)
}

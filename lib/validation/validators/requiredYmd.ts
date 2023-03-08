import type { Ymd } from '../../support/Day'

type YmdType = 'y' | 'm' | 'd'

const YmdMap = {
  y: 'year',
  m: 'month',
  d: 'date'
} as const

export function requiredYmd(ymd: Ymd, required: YmdType[] = ['y', 'm', 'd']): boolean {
  return required.every((r) => ymd[YmdMap[r]] != null)
}

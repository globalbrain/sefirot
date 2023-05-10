import { type Hms } from '../../support/Day'

type HmsType = 'h' | 'm' | 's'

const HmsMap = {
  h: 'hour',
  m: 'minute',
  s: 'second'
} as const

export function requiredHms(hms: Hms, required: HmsType[] = ['h', 'm', 's']): boolean {
  return required.every((r) => hms[HmsMap[r]] != null)
}

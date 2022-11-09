export interface Hms {
  hour?: string
  minute?: string
  second?: string
}

export type HmsType = 'h' | 'm' | 's'

export const HmsMap = {
  h: 'hour',
  m: 'minute',
  s: 'second'
} as const

export function requiredHms(hms: Hms, required: HmsType[] = ['h', 'm', 's']): boolean {
  return required.every((r) => hms[HmsMap[r]] !== undefined)
}

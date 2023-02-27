export interface Hms {
  hour?: string | null
  minute?: string | null
  second?: string | null
}

export type HmsType = 'h' | 'm' | 's'

export const HmsMap = {
  h: 'hour',
  m: 'minute',
  s: 'second'
} as const

export function requiredHms(hms: Hms, required: HmsType[] = ['h', 'm', 's']): boolean {
  return required.every((r) => hms[HmsMap[r]] != null)
}

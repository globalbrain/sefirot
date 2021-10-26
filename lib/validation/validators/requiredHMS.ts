export interface HMS {
  hour?: number
  minute?: number
  second?: number
}

export type HMSType = 'h' | 'm' | 's'

const HMSMap = {
  h: 'hour',
  m: 'minute',
  s: 'second'
} as const

export default function requiredHMS(hms: HMS, required: HMSType[] = ['h', 'm', 's']): boolean {
  return required.every(r => hms[HMSMap[r]] !== undefined)
}

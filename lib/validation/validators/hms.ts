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

export default function hms(hms: HMS, required: HMSType[] = ['h', 'm', 's']): boolean {
  return required.every((r) => {
    const value = hms[HMSMap[r]]

    if (value === undefined) {
      return true
    }

    return r === 'h'
      ? value >= 0 && value < 24
      : value >= 0 && value < 60
  })
}

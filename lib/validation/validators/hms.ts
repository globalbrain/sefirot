export interface HMS {
  hour?: string
  minute?: string
  second?: string
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

    const valueAsNumber = Number(value)

    return r === 'h'
      ? valueAsNumber >= 0 && valueAsNumber < 24
      : valueAsNumber >= 0 && valueAsNumber < 60
  })
}

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

export function hms(hms: Hms, required: HmsType[] = ['h', 'm', 's']): boolean {
  return required.every((r) => {
    const value = hms[HmsMap[r]]

    if (value === undefined) {
      return true
    }

    const valueAsNumber = Number(value)

    return r === 'h'
      ? valueAsNumber >= 0 && valueAsNumber < 24
      : valueAsNumber >= 0 && valueAsNumber < 60
  })
}

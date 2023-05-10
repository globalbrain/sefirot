import { type Hms } from '../../support/Day'

type HmsType = 'h' | 'm' | 's'

const HmsMap = {
  h: 'hour',
  m: 'minute',
  s: 'second'
} as const

export function hms(hms: Hms, required: HmsType[] = ['h', 'm', 's']): boolean {
  return required.every((r) => {
    const value = hms[HmsMap[r]]

    if (value === null) {
      return true
    }

    const valueAsNumber = Number(value)

    return (r === 'h')
      ? (valueAsNumber >= 0 && valueAsNumber < 24)
      : (valueAsNumber >= 0 && valueAsNumber < 60)
  })
}

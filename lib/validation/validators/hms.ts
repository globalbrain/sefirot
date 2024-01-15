import { HmsMap, type HmsType } from '../../support/Day'
import { isHms } from '../../support/Utils'

export function hms(value: unknown, required: HmsType[] = ['h', 'm', 's']): boolean {
  if (!isHms(value)) {
    return false
  }

  return required.every((r) => {
    const _value = value[HmsMap[r]]

    if (_value === null) {
      return true
    }

    const valueAsNumber = Number(_value)

    return (r === 'h')
      ? (valueAsNumber >= 0 && valueAsNumber < 24)
      : (valueAsNumber >= 0 && valueAsNumber < 60)
  })
}

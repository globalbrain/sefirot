import { HmsMap, type HmsType, isHms } from '../../support/Day'

export function hms(value: unknown, required: HmsType[] = ['h', 'm', 's']): boolean {
  // Vuelidate's helpers.req() returns false for an empty plain object,
  // so such value has to be handled here instead of setting `optional: true` of `createRule` function.
  if (value === undefined || value === null) {
    return true
  }

  if (!isHms(value, required)) {
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

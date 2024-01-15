import day from 'dayjs'
import { isYmd } from 'sefirot/support/Utils'
import { YmdMap, type YmdType } from '../../support/Day'

export function ymd(value: unknown, required: YmdType[] = ['y', 'm', 'd']): boolean {
  if (!isYmd(value, required)) {
    return false
  }

  return required.every((r) => {
    const _value = value[YmdMap[r]]

    if (_value === null) {
      return true
    }

    if (r === 'y') {
      return _value > 0 && _value <= 9999
    }

    if (r === 'm') {
      return _value > 0 && _value <= 12
    }

    const d = day(new Date(2020, value.month ? value.month - 1 : 1, _value))

    if (d.month() + 1 !== (value.month ?? 1)) {
      return false
    }

    return d.isValid()
  })
}

import { isEqual } from '../../support/Util'

export default function include(value: any[], other: any): boolean {
  return Array.isArray(other)
    ? value.some(v => other.some(o => isEqual(v, o)))
    : value.some(v => isEqual(v, other))
}

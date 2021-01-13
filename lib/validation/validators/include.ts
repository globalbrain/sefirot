import { isEqual } from '../../support/Util'

export default function include(value: any[], other: any): boolean {
  return value.some(v => isEqual(v, other))
}

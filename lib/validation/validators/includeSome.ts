import { isEqual } from '../../support/Util'

export default function includeSome(value: any[], other: any[]): boolean {
  return value.some(v => other.some(o => isEqual(v, o)))
}

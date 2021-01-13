import { isEqual } from '../../support/Util'

export default function sameAs(value: any, other: any): boolean {
  return isEqual(value, other)
}

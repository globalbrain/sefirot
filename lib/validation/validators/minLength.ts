import { getLength } from '../../support/Utils'

export function minLength(value: unknown, length: number): boolean {
  try { return getLength(value) >= length } catch { return false }
}

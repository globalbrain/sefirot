import { getLength } from '../../support/Utils'

export function maxLength(value: unknown, length: number): boolean {
  try { return getLength(value) <= length } catch { return false }
}

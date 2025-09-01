import { day } from 'sefirot/support/Day'
import { before } from 'sefirot/validation/validators'

describe('validation/validators/before', () => {
  it('returns false when value is not a Day', () => {
    const date = day('2024-01-01')
    expect(before(undefined, date)).toBe(false)
    expect(before('2024-01-02', date)).toBe(false)
    expect(before(1704067200000, date)).toBe(false)
    expect(before({} as any, date)).toBe(false)
  })

  it('returns false when date arg is not a Day', () => {
    const value = day('2024-01-02')
    // @ts-expect-error intentional bad arg
    expect(before(value, undefined)).toBe(false)
    // @ts-expect-error intentional bad arg
    expect(before(value, '2024-01-01')).toBe(false)
    // @ts-expect-error intentional bad arg
    expect(before(value, 0)).toBe(false)
  })

  it('returns true when value is strictly before', () => {
    const value = day('2023-12-31')
    const date = day('2024-01-01')
    expect(before(value, date)).toBe(true)
  })

  it('returns false when value equals date exactly', () => {
    const d = day('2024-01-01T00:00:00')
    expect(before(d, d)).toBe(false)
  })

  it('returns false when value is the same calendar day but earlier time', () => {
    const value = day('2024-01-01T00:00:00')
    const date = day('2024-01-01T23:59:59')
    expect(before(value, date)).toBe(false)
  })

  it('returns false when value is after the date', () => {
    const value = day('2024-01-02')
    const date = day('2024-01-01')
    expect(before(value, date)).toBe(false)
  })
})

import { day } from 'sefirot/support/Day'
import { after } from 'sefirot/validation/validators'

describe('validation/validators/after', () => {
  it('returns false when value is not a Day', () => {
    const date = day('2024-01-01')
    expect(after(undefined, date)).toBe(false)
    expect(after('2024-01-02', date)).toBe(false)
    expect(after(1704067200000, date)).toBe(false)
    expect(after({}, date)).toBe(false)
  })

  it('returns false when date arg is not a Day', () => {
    const value = day('2024-01-02')
    // @ts-expect-error intentional bad arg
    expect(after(value, undefined)).toBe(false)
    // @ts-expect-error intentional bad arg
    expect(after(value, '2024-01-01')).toBe(false)
    // @ts-expect-error intentional bad arg
    expect(after(value, 0)).toBe(false)
  })

  it('returns true when value is strictly after', () => {
    const value = day('2024-01-02')
    const date = day('2024-01-01')
    expect(after(value, date)).toBe(true)
  })

  it('returns false when value equals date exactly', () => {
    const d = day('2024-01-01T00:00:00')
    expect(after(d, d)).toBe(false)
  })

  it('returns false when value is the same calendar day but later time', () => {
    const value = day('2024-01-01T10:00:00')
    const date = day('2024-01-01T00:00:00')
    expect(after(value, date)).toBe(false)
  })

  it('returns false when value is before the date', () => {
    const value = day('2023-12-31')
    const date = day('2024-01-01')
    expect(after(value, date)).toBe(false)
  })
})

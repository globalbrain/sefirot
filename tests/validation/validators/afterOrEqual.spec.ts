import { day } from 'sefirot/support/Day'
import { afterOrEqual } from 'sefirot/validation/validators'

describe('validation/validators/afterOrEqual', () => {
  it('returns false when value is not a Day', () => {
    const date = day('2024-01-01')
    expect(afterOrEqual(undefined, date)).toBe(false)
    expect(afterOrEqual('2024-01-02', date)).toBe(false)
    expect(afterOrEqual(1704067200000, date)).toBe(false)
    expect(afterOrEqual({} as any, date)).toBe(false)
  })

  it('returns false when date arg is not a Day', () => {
    const value = day('2024-01-02')
    // @ts-expect-error intentional bad arg
    expect(afterOrEqual(value, undefined)).toBe(false)
    // @ts-expect-error intentional bad arg
    expect(afterOrEqual(value, '2024-01-01')).toBe(false)
    // @ts-expect-error intentional bad arg
    expect(afterOrEqual(value, 0)).toBe(false)
  })

  it('returns true when value is strictly after', () => {
    const value = day('2024-01-02')
    const date = day('2024-01-01')
    expect(afterOrEqual(value, date)).toBe(true)
  })

  it('returns true when value equals date exactly', () => {
    const d = day('2024-01-01T00:00:00')
    expect(afterOrEqual(d, d)).toBe(true)
  })

  it('treats the same calendar day as equal even if value is later in the day', () => {
    const value = day('2024-01-01T10:00:00')
    const date = day('2024-01-01T00:00:00')
    expect(afterOrEqual(value, date)).toBe(true)
  })

  it('treats the same calendar day as equal even if value is earlier in the day', () => {
    const value = day('2024-01-01T00:00:00')
    const date = day('2024-01-01T23:59:59')
    expect(afterOrEqual(value, date)).toBe(true)
  })

  it('returns false when value is before the previous calendar day', () => {
    const value = day('2023-12-31')
    const date = day('2024-01-01')
    expect(afterOrEqual(value, date)).toBe(false)
  })
})

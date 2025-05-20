import { day } from 'sefirot/support/Day'
import { afterOrEqual } from 'sefirot/validation/validators'

describe('validation/validators/afterOrEqual', () => {
  it('should validate if the date is after or equal to the specified date', () => {
    const date = day('2020-01-02')

    expect(afterOrEqual(day('2020-01-03'), date)).toBe(true)
    expect(afterOrEqual(date, date)).toBe(true)
    expect(afterOrEqual(day('2020-01-01'), date)).toBe(false)
  })

  it('should return false if value or date is not a Day instance', () => {
    const date = day('2020-01-02')

    expect(afterOrEqual(undefined, date)).toBe(false)
    expect(afterOrEqual(null, date)).toBe(false)
    expect(afterOrEqual(true as any, date)).toBe(false)
    expect(afterOrEqual(date, undefined)).toBe(false)
    expect(afterOrEqual(date, null)).toBe(false)
    expect(afterOrEqual(date as any, '2020-01-02' as any)).toBe(false)
  })
})

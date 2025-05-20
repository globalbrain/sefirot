import { day } from 'sefirot/support/Day'
import { beforeOrEqual } from 'sefirot/validation/validators'

describe('validation/validators/beforeOrEqual', () => {
  it('should validate if the date is before or equal to the specified date', () => {
    const date = day('2020-01-02')

    expect(beforeOrEqual(day('2020-01-01'), date)).toBe(true)
    expect(beforeOrEqual(date, date)).toBe(true)
    expect(beforeOrEqual(day('2020-01-03'), date)).toBe(false)
  })

  it('should return false if value or date is not a Day instance', () => {
    const date = day('2020-01-02')

    expect(beforeOrEqual(undefined, date)).toBe(false)
    expect(beforeOrEqual(null, date)).toBe(false)
    expect(beforeOrEqual(true as any, date)).toBe(false)
    expect(beforeOrEqual(date, undefined)).toBe(false)
    expect(beforeOrEqual(date, null)).toBe(false)
    expect(beforeOrEqual(date as any, '2020-01-02' as any)).toBe(false)
  })
})

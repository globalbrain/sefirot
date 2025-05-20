import { day } from 'sefirot/support/Day'
import { before } from 'sefirot/validation/validators'

describe('validation/validators/before', () => {
  it('should validate if the date is before the specified date', () => {
    const date = day('2020-01-02')

    expect(before(day('2020-01-01'), date)).toBe(true)
    expect(before(date, date)).toBe(false)
    expect(before(day('2020-01-03'), date)).toBe(false)
  })

  it('should return false if value or date is not a Day instance', () => {
    const date = day('2020-01-02')

    expect(before(undefined, date)).toBe(false)
    expect(before(null, date)).toBe(false)
    expect(before(true as any, date)).toBe(false)
    expect(before(date, undefined as any)).toBe(false)
    expect(before(date, null as any)).toBe(false)
    expect(before(date as any, '2020-01-02' as any)).toBe(false)
  })
})

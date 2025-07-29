import { day } from 'sefirot/support/Day'
import { after } from 'sefirot/validation/validators'

describe('validation/validators/after', () => {
  it('should validate if the date is after the specified date', () => {
    const date = day('2020-01-02')

    expect(after(day('2020-01-03'), date)).toBe(true)
    expect(after(date, date)).toBe(false)
    expect(after(day('2020-01-01'), date)).toBe(false)
  })

  it('should return false if value or date is not a Day instance', () => {
    const date = day('2020-01-02')

    expect(after(undefined, date)).toBe(false)
    expect(after(null, date)).toBe(false)
    expect(after(true as any, date)).toBe(false)
    expect(after(date, undefined as any)).toBe(false)
    expect(after(date, null as any)).toBe(false)
    expect(after(date as any, '2020-01-02' as any)).toBe(false)
  })
})

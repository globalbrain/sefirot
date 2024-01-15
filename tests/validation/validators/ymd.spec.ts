import { ymd } from 'sefirot/validation/validators'

describe('validation/validators/ymd', () => {
  it('should validate if the year, month, and date is valid value', () => {
    expect(ymd({ year: 1, month: 1, date: 1 })).toBe(true)
    expect(ymd({ year: 9999, month: 12, date: null })).toBe(true)

    expect(ymd({ year: 2000, month: null, date: 1 })).toBe(false)
    expect(ymd({ year: 0, month: 12, date: 1 })).toBe(false)
    expect(ymd({ year: 10000, month: 12, date: 1 })).toBe(false)
    expect(ymd({ year: 2000, month: 0, date: 1 })).toBe(false)
    expect(ymd({ year: 2000, month: 13, date: 1 })).toBe(false)
    expect(ymd({ year: 2000, month: 1, date: 32 })).toBe(false)
    expect(ymd({ year: 2000, month: 2, date: 30 })).toBe(false)
    expect(ymd({ year: 2000, month: 4, date: 31 })).toBe(false)

    expect(ymd({})).toBe(false)
    expect(ymd({ year: 2000 })).toBe(false)
    expect(ymd({ year: 2000, month: 4 })).toBe(false)
  })

  it('should validate only the given types', () => {
    expect(ymd({ year: 2000, month: 12, date: 32 }, ['y', 'm'])).toBe(true)
    expect(ymd({ year: 2000, month: 13, date: 13 }, ['y', 'm'])).toBe(false)
    expect(ymd({ year: 2000, month: 13 }, ['y', 'm'])).toBe(false)
  })
})

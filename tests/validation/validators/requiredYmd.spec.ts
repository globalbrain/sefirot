import { requiredYmd } from 'sefirot/validation/validators'

describe('validation/validators/requiredYmd', () => {
  test('validates if the year, month, and date are present', () => {
    expect(requiredYmd({ year: null, month: null, date: null })).toBe(false)
    expect(requiredYmd({ year: 2000, month: 12, date: 31 })).toBe(true)
    expect(requiredYmd({ year: 2000, month: null, date: 2 })).toBe(false)

    expect(requiredYmd({})).toBe(false)
    expect(requiredYmd({ year: 2000 })).toBe(false)
    expect(requiredYmd({ year: 2000, month: 12 })).toBe(false)
  })

  test('validates only given types', () => {
    expect(requiredYmd({ year: 2000, month: 12, date: null }, ['y', 'm'])).toBe(true)
    expect(requiredYmd({ year: 2000, month: 12 }, ['y', 'm'])).toBe(true)
  })
})

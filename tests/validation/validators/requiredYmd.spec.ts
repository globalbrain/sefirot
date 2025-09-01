import { requiredYmd } from 'sefirot/validation/validators'

describe('validation/validators/requiredYmd', () => {
  it('validates if the year, month, and date are present', () => {
    expect(requiredYmd({ year: 2000, month: 12, date: 31 })).toBe(true)

    expect(requiredYmd(undefined)).toBe(false)
    expect(requiredYmd(null)).toBe(false)
    expect(requiredYmd(true)).toBe(false)
    expect(requiredYmd(false)).toBe(false)
    expect(requiredYmd(1)).toBe(false)
    expect(requiredYmd('abc')).toBe(false)
    expect(requiredYmd({ year: null, month: null, date: null })).toBe(false)
    expect(requiredYmd({ year: 2000, month: null, date: 2 })).toBe(false)
    expect(requiredYmd({})).toBe(false)
    expect(requiredYmd({ year: 2000 })).toBe(false)
    expect(requiredYmd({ year: 2000, month: 12 })).toBe(false)
    expect(requiredYmd([])).toBe(false)
  })

  it('validates only given types', () => {
    expect(requiredYmd({ year: 2000, month: 12, date: null }, ['y', 'm'])).toBe(true)
    expect(requiredYmd({ year: 2000, month: 12 }, ['y', 'm'])).toBe(true)

    expect(requiredYmd(undefined, ['y', 'm'])).toBe(false)
    expect(requiredYmd(null, ['y', 'm'])).toBe(false)
    expect(requiredYmd(true, ['y', 'm'])).toBe(false)
    expect(requiredYmd(false, ['y', 'm'])).toBe(false)
    expect(requiredYmd(1, ['y', 'm'])).toBe(false)
    expect(requiredYmd('abc', ['y', 'm'])).toBe(false)
    expect(requiredYmd({}, ['y', 'm'])).toBe(false)
    expect(requiredYmd({ year: 2000 }, ['y', 'm'])).toBe(false)
    expect(requiredYmd({ year: 2000, month: undefined }, ['y', 'm'])).toBe(false)
    expect(requiredYmd({ year: 2000, month: null }, ['y', 'm'])).toBe(false)
    expect(requiredYmd([], ['y', 'm'])).toBe(false)
  })
})

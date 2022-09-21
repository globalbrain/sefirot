import { requiredYmd } from 'sefirot/validation/validators/requiredYmd'

describe('validation/validators/requiredYmd', () => {
  it('should validate if the year, month, and date are present', () => {
    expect(requiredYmd({ year: 2000, month: 12, date: 31 })).toBe(true)
    expect(requiredYmd({ year: 2000, month: null, date: 2 })).toBe(false)
  })

  it('should validate only given types', () => {
    const data = { year: 2000, month: 12, date: null }

    expect(requiredYmd(data, ['y', 'm'])).toBe(true)
  })
})

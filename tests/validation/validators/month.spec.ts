import { month } from 'sefirot/validation/validators'

describe('validation/validators/month', () => {
  it('accepts integers from 1 to 12 inclusive', () => {
    for (let i = 1; i <= 12; i++) {
      expect(month(i)).toBe(true)
    }
  })

  it('rejects 0 and values greater than 12', () => {
    expect(month(0)).toBe(false)
    expect(month(13)).toBe(false)
  })

  it('rejects negative numbers', () => {
    expect(month(-1)).toBe(false)
    expect(month(-12)).toBe(false)
  })

  it('rejects non-integers', () => {
    expect(month(1.5)).toBe(false)
    expect(month(12.1)).toBe(false)
  })

  it('rejects non-number types', () => {
    expect(month('1')).toBe(false)
    expect(month(true)).toBe(false)
    expect(month(null)).toBe(false)
    expect(month(undefined)).toBe(false)
    expect(month({})).toBe(false)
    expect(month([])).toBe(false)
  })

  it('rejects NaN and Infinity', () => {
    expect(month(Number.NaN)).toBe(false)
    expect(month(Number.POSITIVE_INFINITY)).toBe(false)
    expect(month(Number.NEGATIVE_INFINITY)).toBe(false)
  })
})

import { month } from 'sefirot/validation/validators'

describe('validation/validators/month', () => {
  test('it validates given month is valid month', () => {
    expect(month(1)).toBe(true)
    expect(month(6)).toBe(true)
    expect(month(12)).toBe(true)

    expect(month(undefined)).toBe(false)
    expect(month(null)).toBe(false)
    expect(month(true)).toBe(false)
    expect(month(false)).toBe(false)
    expect(month(0)).toBe(false)
    expect(month(13)).toBe(false)
    expect(month('1')).toBe(false)
    expect(month({})).toBe(false)
    expect(month([])).toBe(false)
  })
})

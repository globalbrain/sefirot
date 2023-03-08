import { month } from 'sefirot/validation/validators'

describe('validation/validators/month', () => {
  test('validate given month is valid month', () => {
    expect(month(0)).toBe(false)
    expect(month(1)).toBe(true)
    expect(month(6)).toBe(true)
    expect(month(12)).toBe(true)
    expect(month(13)).toBe(false)
  })
})

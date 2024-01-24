import { hyphen } from 'sefirot/validation/validators'

describe('validation/validators/hyphen', () => {
  it('should validates if the value is true', () => {
    expect(hyphen('-')).toBe(true)

    expect(hyphen(undefined)).toBe(false)
    expect(hyphen(null)).toBe(false)
    expect(hyphen(true)).toBe(false)
    expect(hyphen(false)).toBe(false)
    expect(hyphen(1)).toBe(false)
    expect(hyphen('abc')).toBe(false)
    expect(hyphen({})).toBe(false)
    expect(hyphen([])).toBe(false)
  })
})

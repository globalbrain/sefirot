import { checked } from 'sefirot/validation/validators'

describe('validation/validators/checked', () => {
  it('should validates if the value is true', () => {
    expect(checked(true)).toBe(true)

    expect(checked(undefined)).toBe(false)
    expect(checked(null)).toBe(false)
    expect(checked(false)).toBe(false)
    expect(checked(1)).toBe(false)
    expect(checked('abc')).toBe(false)
    expect(checked({})).toBe(false)
    expect(checked([])).toBe(false)
  })
})

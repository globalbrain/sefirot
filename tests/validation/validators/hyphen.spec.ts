import { hyphen } from 'sefirot/validation/validators'

describe('validation/validators/hyphen', () => {
  it('should validates if the value is true', () => {
    expect(hyphen('-')).toBe(true)
    expect(hyphen('')).toBe(false)
    expect(hyphen(1)).toBe(false)
  })
})

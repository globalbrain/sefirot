import { hyphen } from 'sefirot/validation/validators'

describe('validation/validators/hyphen', () => {
  it('should validates if the value is true', () => {
    expect(hyphen('-')).toBe(true)
    expect(hyphen('')).toBe(false)
  })
})

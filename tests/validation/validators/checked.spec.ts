import { checked } from 'sefirot/validation/validators'

describe('validation/validators/checked', () => {
  it('should validates if the value is true', () => {
    expect(checked(true)).toBe(true)
    expect(checked(false)).toBe(false)
  })
})

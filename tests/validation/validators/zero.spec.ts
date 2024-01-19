import { zero } from 'sefirot/validation/validators'

describe('validation/validators/zero', () => {
  it('should validates if the value is true', () => {
    expect(zero(0)).toBe(true)

    expect(zero(undefined)).toBe(false)
    expect(zero(null)).toBe(false)
    expect(zero(1)).toBe(false)
    expect(zero('0')).toBe(false)
  })
})

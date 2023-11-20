import { isZero } from 'sefirot/validation/validators'

describe('validation/validators/isZero', () => {
  it('should validates if the value is true', () => {
    expect(isZero(0)).toBe(true)
    expect(isZero('0')).toBe(true)
    expect(isZero('')).toBe(false)
  })
})

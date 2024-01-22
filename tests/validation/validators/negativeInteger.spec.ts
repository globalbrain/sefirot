import { negativeInteger } from 'sefirot/validation/validators'

describe('validation/validators/negativeInteger', () => {
  it('should validates if the value is negative integer', () => {
    expect(negativeInteger(-1)).toBe(true)
    expect(negativeInteger(-1.0)).toBe(true)
    expect(negativeInteger(-10)).toBe(true)

    expect(negativeInteger(undefined)).toBe(false)
    expect(negativeInteger(null)).toBe(false)
    expect(negativeInteger(-1.1)).toBe(false)
    expect(negativeInteger(1)).toBe(false)
    expect(negativeInteger(1.1)).toBe(false)
    expect(negativeInteger(+1)).toBe(false)
    expect(negativeInteger(+1.1)).toBe(false)
  })
})

import { negativeInteger } from 'sefirot/validation/validators'

describe('validation/validators/negativeInteger', () => {
  it('should validates if the value is true', () => {
    expect(negativeInteger(-1)).toBe(true)
    expect(negativeInteger(-1.0)).toBe(true)
    expect(negativeInteger(-10)).toBe(true)

    expect(negativeInteger(0)).toBe(false)
    expect(negativeInteger(+0)).toBe(false)
    expect(negativeInteger(-0)).toBe(false)
    expect(negativeInteger(-1.1)).toBe(false)
    expect(negativeInteger(1)).toBe(false)
    expect(negativeInteger(1.1)).toBe(false)
    expect(negativeInteger(+1)).toBe(false)
    expect(negativeInteger(+1.1)).toBe(false)

    expect(negativeInteger('-1')).toBe(false)
  })
})

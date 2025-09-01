import { negativeInteger } from 'sefirot/validation/validators'

describe('validation/validators/negativeInteger', () => {
  it('validatess if the value is negative integer', () => {
    expect(negativeInteger(-1)).toBe(true)
    expect(negativeInteger(-1.0)).toBe(true)
    expect(negativeInteger(-10)).toBe(true)

    expect(negativeInteger(undefined)).toBe(false)
    expect(negativeInteger(null)).toBe(false)
    expect(negativeInteger(true)).toBe(false)
    expect(negativeInteger(false)).toBe(false)
    expect(negativeInteger(-1.1)).toBe(false)
    expect(negativeInteger(1)).toBe(false)
    expect(negativeInteger(1.1)).toBe(false)
    expect(negativeInteger(+1)).toBe(false)
    expect(negativeInteger(+1.1)).toBe(false)
    expect(negativeInteger('-1')).toBe(false)
    expect(negativeInteger('-1.0')).toBe(false)
    expect(negativeInteger('-10')).toBe(false)
    expect(negativeInteger({})).toBe(false)
    expect(negativeInteger([])).toBe(false)
  })
})

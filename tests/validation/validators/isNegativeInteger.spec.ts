import { isNegativeInteger } from 'sefirot/validation/validators'

describe('validation/validators/isNegativeInteger', () => {
  it('should validates if the value is true', () => {
    expect(isNegativeInteger(-1)).toBe(true)
    expect(isNegativeInteger('-1')).toBe(true)
    expect(isNegativeInteger(-10)).toBe(true)
    expect(isNegativeInteger('-10')).toBe(true)

    expect(isNegativeInteger(0)).toBe(false)
    expect(isNegativeInteger('0')).toBe(false)
    expect(isNegativeInteger(+0)).toBe(false)
    expect(isNegativeInteger('+0')).toBe(false)
    expect(isNegativeInteger(-0)).toBe(false)
    expect(isNegativeInteger('-0')).toBe(false)
    expect(isNegativeInteger(1)).toBe(false)
    expect(isNegativeInteger('1')).toBe(false)
    expect(isNegativeInteger(+1)).toBe(false)
    expect(isNegativeInteger('+1')).toBe(false)
    expect(isNegativeInteger('01')).toBe(false)
    expect(isNegativeInteger('-01')).toBe(false)
  })
})

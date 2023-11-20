import { isPositiveInteger } from 'sefirot/validation/validators'

describe('validation/validators/isPositiveInteger', () => {
  it('should validates if the value is true', () => {
    expect(isPositiveInteger(1)).toBe(true)
    expect(isPositiveInteger('1')).toBe(true)
    expect(isPositiveInteger(+1)).toBe(true)
    expect(isPositiveInteger('+1')).toBe(true)
    expect(isPositiveInteger(10)).toBe(true)
    expect(isPositiveInteger('10')).toBe(true)
    expect(isPositiveInteger(+10)).toBe(true)
    expect(isPositiveInteger('+10')).toBe(true)

    expect(isPositiveInteger(0)).toBe(false)
    expect(isPositiveInteger('0')).toBe(false)
    expect(isPositiveInteger(+0)).toBe(false)
    expect(isPositiveInteger('+0')).toBe(false)
    expect(isPositiveInteger(-0)).toBe(false)
    expect(isPositiveInteger('-0')).toBe(false)
    expect(isPositiveInteger(-1)).toBe(false)
    expect(isPositiveInteger('-1')).toBe(false)
    expect(isPositiveInteger('01')).toBe(false)
    expect(isPositiveInteger('-01')).toBe(false)
  })
})

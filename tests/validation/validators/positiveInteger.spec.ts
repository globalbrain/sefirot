import { positiveInteger } from 'sefirot/validation/validators'

describe('validation/validators/positiveInteger', () => {
  it('should validates if the value is positive integer', () => {
    expect(positiveInteger(1)).toBe(true)
    expect(positiveInteger(+1)).toBe(true)
    expect(positiveInteger(1.0)).toBe(true)
    expect(positiveInteger(+1.0)).toBe(true)
    expect(positiveInteger(10)).toBe(true)
    expect(positiveInteger(+10)).toBe(true)

    expect(positiveInteger(undefined)).toBe(false)
    expect(positiveInteger(null)).toBe(false)
    expect(positiveInteger(true)).toBe(false)
    expect(positiveInteger(false)).toBe(false)
    expect(positiveInteger(-1)).toBe(false)
    expect(positiveInteger(1.1)).toBe(false)
    expect(positiveInteger(-1.1)).toBe(false)
    expect(positiveInteger('1')).toBe(false)
    expect(positiveInteger('+1')).toBe(false)
    expect(positiveInteger('1.0')).toBe(false)
    expect(positiveInteger('+1.0')).toBe(false)
    expect(positiveInteger('10')).toBe(false)
    expect(positiveInteger('+10')).toBe(false)
    expect(positiveInteger({})).toBe(false)
    expect(positiveInteger([])).toBe(false)
  })
})

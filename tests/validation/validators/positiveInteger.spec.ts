import { positiveInteger } from 'sefirot/validation/validators'

describe('validation/validators/positiveInteger', () => {
  it('should validates if the value is true', () => {
    expect(positiveInteger(1)).toBe(true)
    expect(positiveInteger(+1)).toBe(true)
    expect(positiveInteger(1.0)).toBe(true)
    expect(positiveInteger(+1.0)).toBe(true)
    expect(positiveInteger(10)).toBe(true)
    expect(positiveInteger(+10)).toBe(true)

    expect(positiveInteger(0)).toBe(false)
    expect(positiveInteger(+0)).toBe(false)
    expect(positiveInteger(-0)).toBe(false)
    expect(positiveInteger(-1)).toBe(false)
    expect(positiveInteger(1.1)).toBe(false)
    expect(positiveInteger(-1.1)).toBe(false)

    expect(positiveInteger('1')).toBe(false)
  })
})

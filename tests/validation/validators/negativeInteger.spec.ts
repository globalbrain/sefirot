import { negativeInteger } from 'sefirot/validation/validators'

describe('validation/validators/negativeInteger', () => {
  it('accepts negative integers within safe range', () => {
    expect(negativeInteger(-1)).toBe(true)
    expect(negativeInteger(Number.MIN_SAFE_INTEGER)).toBe(true)
  })

  it('rejects zero and -0', () => {
    expect(negativeInteger(0)).toBe(false)
    expect(negativeInteger(-0)).toBe(false)
  })

  it('rejects non-integers and non-numbers', () => {
    expect(negativeInteger(-1.5)).toBe(false)
    expect(negativeInteger('-.5')).toBe(false)
    expect(negativeInteger(Number.NaN)).toBe(false)
    expect(negativeInteger(Number.POSITIVE_INFINITY)).toBe(false)
    expect(negativeInteger(Number.NEGATIVE_INFINITY)).toBe(false)
    // eslint-disable-next-line unicorn/new-for-builtins
    expect(negativeInteger(new Number(-1))).toBe(false)
  })

  it('rejects values below MIN_SAFE_INTEGER', () => {
    expect(negativeInteger(Number.MIN_SAFE_INTEGER - 1)).toBe(false)
  })
})

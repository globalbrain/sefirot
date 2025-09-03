import { positiveInteger } from 'sefirot/validation/validators'

describe('validation/validators/positiveInteger', () => {
  it('accepts positive integers within safe range', () => {
    expect(positiveInteger(1)).toBe(true)
    expect(positiveInteger(Number.MAX_SAFE_INTEGER)).toBe(true)
  })

  it('rejects zero and -0', () => {
    expect(positiveInteger(0)).toBe(false)
    expect(positiveInteger(-0)).toBe(false)
  })

  it('rejects negatives, non-integers, and non-numbers', () => {
    expect(positiveInteger(-1)).toBe(false)
    expect(positiveInteger(1.2)).toBe(false)
    expect(positiveInteger('2')).toBe(false)
    expect(positiveInteger(Number.NaN)).toBe(false)
    expect(positiveInteger(Number.POSITIVE_INFINITY)).toBe(false)
    // eslint-disable-next-line no-new-wrappers
    expect(positiveInteger(new Number(3))).toBe(false)
  })

  it('rejects values above MAX_SAFE_INTEGER', () => {
    expect(positiveInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false)
  })
})

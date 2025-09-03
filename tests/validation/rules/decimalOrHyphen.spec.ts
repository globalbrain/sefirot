import { decimalOrHyphen } from 'sefirot/validation/rules'

describe('validation/rules/decimalOrHyphen', () => {
  it('validates whether the value is decimalOrHyphen', () => {
    const rule = decimalOrHyphen()

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)
    expect(rule.$validator(0, null, null)).toBe(true)
    expect(rule.$validator(1, null, null)).toBe(true)
    expect(rule.$validator(-1, null, null)).toBe(true)
    expect(rule.$validator(1.1, null, null)).toBe(true)
    expect(rule.$validator(-1.1, null, null)).toBe(true)
    expect(rule.$validator('1.00', null, null)).toBe(true)
    expect(rule.$validator('-1.00', null, null)).toBe(true)
    expect(rule.$validator('-', null, null)).toBe(true)

    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator('abc', null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = decimalOrHyphen()
    expect(rule.$message({ $params: {} })).toBe('The value must be valid decimal numbers or just a hyphen.')
  })

  it('can set custom error message', () => {
    const rule = decimalOrHyphen('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

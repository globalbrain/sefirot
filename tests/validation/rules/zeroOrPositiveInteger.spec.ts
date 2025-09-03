import { zeroOrPositiveInteger } from 'sefirot/validation/rules'

describe('validation/rules/zeroOrPositiveInteger', () => {
  it('validates whether the value is zeroOrPositiveInteger', () => {
    const rule = zeroOrPositiveInteger()

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator(1, null, null)).toBe(true)
    expect(rule.$validator(+1, null, null)).toBe(true)
    expect(rule.$validator(1.0, null, null)).toBe(true)
    expect(rule.$validator(+1.0, null, null)).toBe(true)
    expect(rule.$validator(10, null, null)).toBe(true)
    expect(rule.$validator(+10, null, null)).toBe(true)
    expect(rule.$validator(0, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)

    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(-1, null, null)).toBe(false)
    expect(rule.$validator(1.1, null, null)).toBe(false)
    expect(rule.$validator(-1.1, null, null)).toBe(false)
    expect(rule.$validator('1', null, null)).toBe(false)
    expect(rule.$validator('+1', null, null)).toBe(false)
    expect(rule.$validator('1.0', null, null)).toBe(false)
    expect(rule.$validator('+1.0', null, null)).toBe(false)
    expect(rule.$validator('10', null, null)).toBe(false)
    expect(rule.$validator('+10', null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = zeroOrPositiveInteger()
    expect(rule.$message({ $params: {} })).toBe('The value must be zero or a valid positive integer.')
  })

  test('custom error message', () => {
    const rule = zeroOrPositiveInteger('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

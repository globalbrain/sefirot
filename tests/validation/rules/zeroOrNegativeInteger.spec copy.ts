import { zeroOrNegativeInteger } from 'sefirot/validation/rules'

describe('validation/rules/zeroOrNegativeInteger', () => {
  test('it validates whether the value is zeroOrNegativeInteger', () => {
    const rule = zeroOrNegativeInteger()
    expect(rule.$validator(0, null, null)).toBe(true)
    expect(rule.$validator('0', null, null)).toBe(true)
    expect(rule.$validator(-1, null, null)).toBe(true)
    expect(rule.$validator('-1', null, null)).toBe(true)
    expect(rule.$validator(-1.0, null, null)).toBe(true)
    expect(rule.$validator('-1.0', null, null)).toBe(true)
    expect(rule.$validator(-10, null, null)).toBe(true)
    expect(rule.$validator('-10', null, null)).toBe(true)

    expect(rule.$validator('', null, null)).toBe(false)
    expect(rule.$validator(-1.1, null, null)).toBe(false)
    expect(rule.$validator('-1.1', null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator('1', null, null)).toBe(false)
    expect(rule.$validator(1.1, null, null)).toBe(false)
    expect(rule.$validator('1.1', null, null)).toBe(false)
    expect(rule.$validator(+1, null, null)).toBe(false)
    expect(rule.$validator('+1', null, null)).toBe(false)
    expect(rule.$validator(+1.1, null, null)).toBe(false)
    expect(rule.$validator('+1.1', null, null)).toBe(false)
    expect(rule.$validator('01', null, null)).toBe(false)
    expect(rule.$validator('-01', null, null)).toBe(false)
  })

  test('it can set custom error message', () => {
    const rule = zeroOrNegativeInteger('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

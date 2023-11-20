import { zeroOrPositiveInteger } from 'sefirot/validation/rules'

describe('validation/rules/zeroOrPositiveInteger', () => {
  test('it validates whether the value is zeroOrPositiveInteger', () => {
    const rule = zeroOrPositiveInteger()
    expect(rule.$validator(0, null, null)).toBe(true)
    expect(rule.$validator('0', null, null)).toBe(true)
    expect(rule.$validator(1, null, null)).toBe(true)
    expect(rule.$validator('1', null, null)).toBe(true)
    expect(rule.$validator(+1, null, null)).toBe(true)
    expect(rule.$validator('+1', null, null)).toBe(true)
    expect(rule.$validator(1.0, null, null)).toBe(true)
    expect(rule.$validator('1.0', null, null)).toBe(true)
    expect(rule.$validator(+1.0, null, null)).toBe(true)
    expect(rule.$validator('+1.0', null, null)).toBe(true)
    expect(rule.$validator(10, null, null)).toBe(true)
    expect(rule.$validator('10', null, null)).toBe(true)
    expect(rule.$validator(+10, null, null)).toBe(true)
    expect(rule.$validator('+10', null, null)).toBe(true)

    expect(rule.$validator('', null, null)).toBe(false)
    expect(rule.$validator(-1, null, null)).toBe(false)
    expect(rule.$validator('-1', null, null)).toBe(false)
    expect(rule.$validator(1.1, null, null)).toBe(false)
    expect(rule.$validator('1.1', null, null)).toBe(false)
    expect(rule.$validator(-1.1, null, null)).toBe(false)
    expect(rule.$validator('-1.1', null, null)).toBe(false)
    expect(rule.$validator('01', null, null)).toBe(false)
    expect(rule.$validator('-01', null, null)).toBe(false)
  })

  test('it can set custom error message', () => {
    const rule = zeroOrPositiveInteger('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

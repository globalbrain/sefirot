import { decimal } from 'sefirot/validation/rules'

describe('validation/rules/decimal', () => {
  test('it validates whether the value is decimal', () => {
    const rule = decimal()
    expect(rule.$validator(0, null, null)).toBe(true)
    expect(rule.$validator(1, null, null)).toBe(true)
    expect(rule.$validator(-1, null, null)).toBe(true)
    expect(rule.$validator(1.1, null, null)).toBe(true)
    expect(rule.$validator(-1.1, null, null)).toBe(true)
    expect(rule.$validator('1.00', null, null)).toBe(true)
    expect(rule.$validator('-1.00', null, null)).toBe(true)
    expect(rule.$validator('abc', null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
  })

  test('it can set custom error message', () => {
    const rule = decimal('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

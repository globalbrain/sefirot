import { minLength } from 'sefirot/validation/rules'

describe('validation/rules/minLength', () => {
  test('it validates whether the value is valid', () => {
    const rule = minLength(10)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('1'.repeat(10), null, null)).toBe(true)

    expect(rule.$validator('1'.repeat(9), null, null)).toBe(false)
  })

  test('it validates whether the value is valid array', () => {
    const rule = minLength(10)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('1'.repeat(10).split(''), null, null)).toBe(true)

    expect(rule.$validator('1'.repeat(9).split(''), null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = minLength(10)
    expect(rule.$message({ $params: {} })).toBe('The value must be greater than or equal to 10 characters.')
  })

  test('it can set custom error message', () => {
    const rule = minLength(10, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

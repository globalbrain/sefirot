import { maxLength } from 'sefirot/validation/rules'

describe('validation/rules/maxLength', () => {
  test('it validates whether the value is valid string', () => {
    const rule = maxLength(10)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator('1'.repeat(10), null, null)).toBe(true)

    expect(rule.$validator('1'.repeat(11), null, null)).toBe(false)
  })

  test('it validates whether the value is valid array', () => {
    const rule = maxLength(10)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)
    expect(rule.$validator('1'.repeat(10).split(''), null, null)).toBe(true)

    expect(rule.$validator('1'.repeat(11).split(''), null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = maxLength(10)
    expect(rule.$message({ $params: {} })).toBe('The value must be less than or equal to 10 characters.')
  })

  test('it can set custom error message', () => {
    const rule = maxLength(10, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

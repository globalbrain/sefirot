import { minValue } from 'sefirot/validation/rules'

describe('validation/rules/minValue', () => {
  test('it validates whether the value is valid string', () => {
    const rule = minValue(10)

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)
    expect(rule.$validator(10, null, null)).toBe(true)
    expect(rule.$validator('10', null, null)).toBe(true)

    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(0, null, null)).toBe(false)
    expect(rule.$validator(9, null, null)).toBe(false)
    expect(rule.$validator('0', null, null)).toBe(false)
    expect(rule.$validator('9', null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  test('it validates whether the value is valid date', () => {
    const minDate = new Date('Fri Jan 19 2024 14:55:28 GMT+0900 (Japan Standard Time)')
    const invalidDate = new Date('Fri Jan 19 2024 14:55:27 GMT+0900 (Japan Standard Time)')
    const rule = minValue(+minDate)

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)
    expect(rule.$validator(minDate, null, null)).toBe(true)

    expect(rule.$validator(invalidDate, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = minValue(10)
    expect(rule.$message({ $params: {} })).toBe('The value must be greater than or equal to 10.')
  })

  test('it can set custom error message', () => {
    const rule = minValue(10, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

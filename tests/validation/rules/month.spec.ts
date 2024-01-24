import { month } from 'sefirot/validation/rules'

describe('validation/rules/month', () => {
  test('it validates given month is valid month', () => {
    const rule = month()

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)
    expect(rule.$validator(1, null, null)).toBe(true)
    expect(rule.$validator(6, null, null)).toBe(true)
    expect(rule.$validator(12, null, null)).toBe(true)

    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(0, null, null)).toBe(false)
    expect(rule.$validator(13, null, null)).toBe(false)
    expect(rule.$validator('1', null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = month()
    expect(rule.$message({ $params: {} })).toBe('The month is invalid.')
  })

  test('it can set custom error message', () => {
    const rule = month('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

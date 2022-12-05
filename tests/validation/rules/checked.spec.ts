import { checked } from 'sefirot/validation/rules'

describe('validation/rules/checked', () => {
  test('it validates whether the value is true', () => {
    const rule = checked()
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(true, null, null)).toBe(true)
    expect(rule.$validator(false, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = checked()
    expect(rule.$message({ $params: {} })).toBe('You must check the field.')
  })

  test('custome error message', () => {
    const rule = checked('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

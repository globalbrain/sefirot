import { checked } from 'sefirot/validation/rules'

describe('validation/rules/checked', () => {
  it('validates if the value is true', () => {
    const rule = checked()

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator(true, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)

    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator('abc', null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  it('shows the default error message', () => {
    const rule = checked()
    expect(rule.$message({ $params: {} })).toBe('You must check the field.')
  })

  it('uses the custom error message', () => {
    const rule = checked('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

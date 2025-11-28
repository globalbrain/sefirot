import { minLength } from 'sefirot/validation/rules'

describe('validation/rules/minLength', () => {
  it('validates the minimum length', () => {
    const rule = minLength(10)

    expect(rule.$validator('1'.repeat(10), null, null)).toBe(true)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)
    expect(rule.$validator(Array.from({ length: 10 }).fill('1'), null, null)).toBe(true)

    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(10, null, null)).toBe(false)
    expect(rule.$validator('1'.repeat(9), null, null)).toBe(false)
    expect(rule.$validator(Array.from({ length: 9 }).fill('1'), null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
    expect(rule.$validator({ length: 10 }, null, null)).toBe(false)
  })

  it('shows the default error message', () => {
    const rule = minLength(10)
    expect(rule.$message({ $params: {} })).toBe('The value must be greater than or equal to 10 characters.')
  })

  it('uses the custom error message', () => {
    const rule = minLength(10, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

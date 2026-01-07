import { zeroOrNegativeInteger } from 'sefirot/validation/rules'

describe('validation/rules/zeroOrNegativeInteger', () => {
  it('validates zero or negative integers', () => {
    const rule = zeroOrNegativeInteger()

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator(-1, null, null)).toBe(true)
    expect(rule.$validator(-1.0, null, null)).toBe(true)
    expect(rule.$validator(-10, null, null)).toBe(true)
    expect(rule.$validator(0, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)

    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(-1.1, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator(1.1, null, null)).toBe(false)
    expect(rule.$validator(+1, null, null)).toBe(false)
    expect(rule.$validator(+1.1, null, null)).toBe(false)
    expect(rule.$validator('-1', null, null)).toBe(false)
    expect(rule.$validator('-1.0', null, null)).toBe(false)
    expect(rule.$validator('-10', null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  it('shows the default error message', () => {
    const rule = zeroOrNegativeInteger()
    expect(rule.$message({ $params: {} })).toBe('The value must be zero or a valid negative integer.')
  })

  it('uses the custom error message', () => {
    const rule = zeroOrNegativeInteger('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

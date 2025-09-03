import { negativeInteger } from 'sefirot/validation/rules'

describe('validation/rules/negativeInteger', () => {
  it('validates if the value is negative integer', () => {
    const rule = negativeInteger()

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)
    expect(rule.$validator(-1, null, null)).toBe(true)
    expect(rule.$validator(-1.0, null, null)).toBe(true)
    expect(rule.$validator(-10, null, null)).toBe(true)

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

  test('default error message', () => {
    const rule = negativeInteger()
    expect(rule.$message({ $params: {} })).toBe('The value must be a valid negative integer.')
  })

  it('can set custom error message', () => {
    const rule = negativeInteger('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

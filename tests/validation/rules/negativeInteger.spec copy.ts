import { negativeInteger } from 'sefirot/validation/rules'

describe('validation/rules/negativeInteger', () => {
  test('it validates whether the value is negativeInteger', () => {
    const rule = negativeInteger()
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator(-1, null, null)).toBe(true)
    expect(rule.$validator(-1.0, null, null)).toBe(true)
    expect(rule.$validator(-10, null, null)).toBe(true)

    expect(rule.$validator(-1.1, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator(1.1, null, null)).toBe(false)
    expect(rule.$validator(+1, null, null)).toBe(false)
    expect(rule.$validator(+1.1, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = negativeInteger()
    expect(rule.$message({ $params: {} })).toBe('The value must be valid negative integer.')
  })

  test('custom error message', () => {
    const rule = negativeInteger('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

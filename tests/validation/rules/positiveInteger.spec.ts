import { positiveInteger } from 'sefirot/validation/rules'

describe('validation/rules/positiveInteger', () => {
  test('it validates whether the value is positiveInteger', () => {
    const rule = positiveInteger()
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator(1, null, null)).toBe(true)
    expect(rule.$validator(+1, null, null)).toBe(true)
    expect(rule.$validator(1.0, null, null)).toBe(true)
    expect(rule.$validator(+1.0, null, null)).toBe(true)
    expect(rule.$validator(10, null, null)).toBe(true)
    expect(rule.$validator(+10, null, null)).toBe(true)

    expect(rule.$validator(-1, null, null)).toBe(false)
    expect(rule.$validator(1.1, null, null)).toBe(false)
    expect(rule.$validator(-1.1, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = positiveInteger()
    expect(rule.$message({ $params: {} })).toBe('The value must be valid positive integer.')
  })

  test('custom error message', () => {
    const rule = positiveInteger('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

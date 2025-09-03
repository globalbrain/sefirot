import { positiveInteger } from 'sefirot/validation/rules'

describe('validation/rules/positiveInteger', () => {
  it('validates if the value is positive integer', () => {
    const rule = positiveInteger()

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator(1, null, null)).toBe(true)
    expect(rule.$validator(+1, null, null)).toBe(true)
    expect(rule.$validator(1.0, null, null)).toBe(true)
    expect(rule.$validator(+1.0, null, null)).toBe(true)
    expect(rule.$validator(10, null, null)).toBe(true)
    expect(rule.$validator(+10, null, null)).toBe(true)

    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(-1, null, null)).toBe(false)
    expect(rule.$validator(1.1, null, null)).toBe(false)
    expect(rule.$validator(-1.1, null, null)).toBe(false)
    expect(rule.$validator('1', null, null)).toBe(false)
    expect(rule.$validator('+1', null, null)).toBe(false)
    expect(rule.$validator('1.0', null, null)).toBe(false)
    expect(rule.$validator('+1.0', null, null)).toBe(false)
    expect(rule.$validator('10', null, null)).toBe(false)
    expect(rule.$validator('+10', null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = positiveInteger()
    expect(rule.$message({ $params: {} })).toBe('The value must be a valid positive integer.')
  })

  it('can set custom error message', () => {
    const rule = positiveInteger('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

import { required } from 'sefirot/validation/rules'

describe('validation/rules/required', () => {
  test('validates if the value is valid', () => {
    const rule = required()

    expect(rule.$validator([1], null, null)).toBe(true)
    expect(rule.$validator({}, null, null)).toBe(true)
    expect(rule.$validator({ a: 1 }, null, null)).toBe(true)
    expect(rule.$validator(true, null, null)).toBe(true)
    expect(rule.$validator(false, null, null)).toBe(true)
    expect(rule.$validator(0, null, null)).toBe(true)
    expect(rule.$validator('1', null, null)).toBe(true)
    expect(rule.$validator(' 1 ', null, null)).toBe(true)
    expect(rule.$validator('🎉', null, null)).toBe(true)
    expect(rule.$validator({}, null, null)).toBe(true)
    expect(rule.$validator(new Date(1234123412341), null, null)).toBe(true)

    expect(rule.$validator(undefined, null, null)).toBe(false)
    expect(rule.$validator(null, null, null)).toBe(false)
    expect(rule.$validator([], null, null)).toBe(false)
    expect(rule.$validator('', null, null)).toBe(false)
    expect(rule.$validator('  ', null, null)).toBe(false)
    expect(rule.$validator(new Date('a'), null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = required()
    expect(rule.$message({ $params: {} })).toBe('The field is required.')
  })

  it('can set custom error message', () => {
    const rule = required('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

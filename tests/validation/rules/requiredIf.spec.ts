import { requiredIf } from 'sefirot/validation/rules'

describe('validation/rules/requiredIf', () => {
  test('validates if the value is valid', () => {
    [
      { condition: true, result: true },
      { condition: false, result: false },
      { condition: 'string', result: true },
      { condition: '', result: false },
      { condition: () => true, result: true },
      { condition: () => false, result: false },
      { condition: async () => true, result: true },
      { condition: async () => false, result: false }
    ].forEach(({ condition, result }) => {
      const rule = requiredIf(condition)
      const expected = Promise.resolve(result)

      expect(rule.$validator([1], null, null)).toStrictEqual(expected)
      expect(rule.$validator({}, null, null)).toStrictEqual(expected)
      expect(rule.$validator({ a: 1 }, null, null)).toStrictEqual(expected)
      expect(rule.$validator(true, null, null)).toStrictEqual(expected)
      expect(rule.$validator(false, null, null)).toStrictEqual(expected)
      expect(rule.$validator(0, null, null)).toStrictEqual(expected)
      expect(rule.$validator('1', null, null)).toStrictEqual(expected)
      expect(rule.$validator(' 1 ', null, null)).toStrictEqual(expected)
      expect(rule.$validator('🎉', null, null)).toStrictEqual(expected)
      expect(rule.$validator({}, null, null)).toStrictEqual(expected)
      expect(rule.$validator(new Date(1234123412341), null, null)).toStrictEqual(expected)

      expect(rule.$validator(undefined, null, null)).toStrictEqual(expected)
      expect(rule.$validator(null, null, null)).toStrictEqual(expected)
      expect(rule.$validator([], null, null)).toStrictEqual(expected)
      expect(rule.$validator('', null, null)).toStrictEqual(expected)
      expect(rule.$validator('  ', null, null)).toStrictEqual(expected)
      expect(rule.$validator(new Date('a'), null, null)).toStrictEqual(expected)
    })
  })

  test('default error message', () => {
    const rule = requiredIf(true)
    expect(rule.$message({ $params: {} })).toBe('The field is required.')
  })

  test('it can set custom error message', () => {
    const rule = requiredIf(true, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

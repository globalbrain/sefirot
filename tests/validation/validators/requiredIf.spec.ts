import { requiredIf } from 'sefirot/validation/validators'

describe('validation/validators/requiredIf', () => {
  test('validates if the value is required if condition is `true`', () => {
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
      const expected = Promise.resolve(result)

      expect(requiredIf([1], condition)).toStrictEqual(expected)
      expect(requiredIf({}, condition)).toStrictEqual(expected)
      expect(requiredIf({ a: 1 }, condition)).toStrictEqual(expected)
      expect(requiredIf(true, condition)).toStrictEqual(expected)
      expect(requiredIf(false, condition)).toStrictEqual(expected)
      expect(requiredIf(0, condition)).toStrictEqual(expected)
      expect(requiredIf('1', condition)).toStrictEqual(expected)
      expect(requiredIf(' 1 ', condition)).toStrictEqual(expected)
      expect(requiredIf('🎉', condition)).toStrictEqual(expected)
      expect(requiredIf({}, condition)).toStrictEqual(expected)
      expect(requiredIf(new Date(1234123412341), condition)).toStrictEqual(expected)

      expect(requiredIf(undefined, condition)).toStrictEqual(expected)
      expect(requiredIf(null, condition)).toStrictEqual(expected)
      expect(requiredIf([], condition)).toStrictEqual(expected)
      expect(requiredIf('', condition)).toStrictEqual(expected)
      expect(requiredIf('  ', condition)).toStrictEqual(expected)
      expect(requiredIf(new Date('a'), condition)).toStrictEqual(expected)
    })
  })
})

import * as Utils from 'sefirot/support/Utils'

describe('support/Utils', () => {
  describe('isNullish', () => {
    test('check if the given value is null or undefined', () => {
      expect(Utils.isNullish(undefined)).toEqual(true)
      expect(Utils.isNullish(null)).toEqual(true)
      expect(Utils.isNullish(1)).toEqual(false)
      expect(Utils.isNullish('a')).toEqual(false)
      expect(Utils.isNullish(true)).toEqual(false)
    })
  })

  describe('isString', () => {
    test('check if the given value is string', () => {
      expect(Utils.isString(undefined)).toEqual(false)
      expect(Utils.isString(null)).toEqual(false)
      expect(Utils.isString(1)).toEqual(false)
      expect(Utils.isString('a')).toEqual(true)
      expect(Utils.isString(true)).toEqual(false)
    })
  })

  describe('isNumber', () => {
    test('check if the given value is number', () => {
      expect(Utils.isNumber(undefined)).toEqual(false)
      expect(Utils.isNumber(null)).toEqual(false)
      expect(Utils.isNumber(1)).toEqual(true)
      expect(Utils.isNumber('a')).toEqual(false)
      expect(Utils.isNumber(true)).toEqual(false)
    })
  })

  describe('isArray', () => {
    test('check if the given value is array', () => {
      expect(Utils.isArray(undefined)).toEqual(false)
      expect(Utils.isArray(null)).toEqual(false)
      expect(Utils.isArray(1)).toEqual(false)
      expect(Utils.isArray('a')).toEqual(false)
      expect(Utils.isArray(true)).toEqual(false)
      expect(Utils.isArray([])).toEqual(true)
    })
  })
})

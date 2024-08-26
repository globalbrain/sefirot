import * as Utils from 'sefirot/support/Utils'

describe('support/Utils', () => {
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

  describe('isObject', () => {
    test('check if the given value is object', () => {
      expect(Utils.isObject(undefined)).toEqual(false)
      expect(Utils.isObject(null)).toEqual(false)
      expect(Utils.isObject(1)).toEqual(false)
      expect(Utils.isObject('a')).toEqual(false)
      expect(Utils.isObject(true)).toEqual(false)
      expect(Utils.isObject([])).toEqual(false)
      expect(Utils.isObject({})).toEqual(true)
    })
  })
})

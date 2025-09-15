import * as Utils from 'sefirot/support/Utils'

describe('support/Utils', () => {
  describe('isString', () => {
    it('checks if the given value is a string', () => {
      expect(Utils.isString(undefined)).toEqual(false)
      expect(Utils.isString(null)).toEqual(false)
      expect(Utils.isString(1)).toEqual(false)
      expect(Utils.isString('a')).toEqual(true)
      expect(Utils.isString(true)).toEqual(false)
    })
  })

  describe('isNumber', () => {
    it('checks if the given value is a number', () => {
      expect(Utils.isNumber(undefined)).toEqual(false)
      expect(Utils.isNumber(null)).toEqual(false)
      expect(Utils.isNumber(1)).toEqual(true)
      expect(Utils.isNumber('a')).toEqual(false)
      expect(Utils.isNumber(true)).toEqual(false)
    })
  })

  describe('isObject', () => {
    it('checks if the given value is an object', () => {
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

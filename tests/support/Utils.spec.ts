import * as Utils from 'sefirot/support/Utils'

describe('support/Utils', () => {
  describe('cloneDeep', () => {
    it('should deep copy a given object', () => {
      const obj = { a: 1, b: 2, c: 3 }

      expect(Utils.cloneDeep(obj)).toEqual({ a: 1, b: 2, c: 3 })
    })
  })
})

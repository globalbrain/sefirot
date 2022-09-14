import * as Num from 'sefirot/support/Num'

describe('support/Num', () => {
  describe('format', () => {
    test('format given number', () => {
      expect(Num.format(100)).toEqual('100')
      expect(Num.format(10000)).toEqual('10,000')
      expect(Num.format(1000000)).toEqual('1,000,000')
    })
  })
})

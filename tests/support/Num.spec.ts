import * as Num from 'sefirot/support/Num'

describe('support/Num', () => {
  describe('format', () => {
    test('format given number', () => {
      expect(Num.format(100)).toEqual('100')
      expect(Num.format(10000)).toEqual('10,000')
      expect(Num.format(1000000)).toEqual('1,000,000')
    })
  })

  describe('abbreviate', () => {
    test('abbreviate given number', () => {
      expect(Num.abbreviate(100)).toEqual('100')
      expect(Num.abbreviate(1000)).toEqual('1K')
      expect(Num.abbreviate(1000000)).toEqual('1M')
      expect(Num.abbreviate(1000000000)).toEqual('1B')
    })

    test('abbreviate given number with precision', () => {
      expect(Num.abbreviate(123, 2)).toEqual('123')
      expect(Num.abbreviate(1234, 2)).toEqual('1.23K')
      expect(Num.abbreviate(12345, 2)).toEqual('12.35K')
      expect(Num.abbreviate(123456, 2)).toEqual('123.46K')
      expect(Num.abbreviate(1234567, 2)).toEqual('1.23M')
    })
  })
})

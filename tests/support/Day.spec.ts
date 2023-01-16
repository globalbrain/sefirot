import * as Day from 'sefirot/support/Day'

describe('support/Day', () => {
  describe('day', () => {
    test('it creates a new day instance', () => {
      expect(Day.day('1985-10-10').format('YYYY/MM/DD')).toBe('1985/10/10')
    })
  })

  describe('utc', () => {
    test('it creates a new utc day instance', () => {
      const date = Day.utc('1985-10-10 00:00:00')

      expect(date.format('YYYY/MM/DD HH:mm:ss')).toBe('1985/10/10 00:00:00')
      expect(date.isUTC()).toBe(true)
    })
  })

  describe('tz', () => {
    test('it creates a new timezone aware day instance', () => {
      const def = Day.tz('1985-10-10 00:00:00')
      const tokyo = Day.tz('1985-10-10 00:00:00', 'Asia/Tokyo')

      expect(def.format('YYYY/MM/DD HH:mm:ss')).toBe('1985/10/10 00:00:00')
      expect(tokyo.format('YYYY/MM/DD HH:mm:ss')).toBe('1985/10/10 00:00:00')
    })
  })
})

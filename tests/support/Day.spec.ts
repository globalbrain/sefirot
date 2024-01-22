import * as Day from 'sefirot/support/Day'

describe('support/Day', () => {
  describe('day', () => {
    test('creates a new day instance', () => {
      expect(Day.day('1985-10-10').format('YYYY/MM/DD')).toBe('1985/10/10')
    })
  })

  describe('utc', () => {
    test('creates a new utc day instance', () => {
      const date = Day.utc('1985-10-10 00:00:00')

      expect(date.format('YYYY/MM/DD HH:mm:ss')).toBe('1985/10/10 00:00:00')
      expect(date.isUTC()).toBe(true)
    })
  })

  describe('tz', () => {
    test('creates a new timezone aware day instance', () => {
      const def = Day.tz('1985-10-10 00:00:00')
      const tokyo = Day.tz('1985-10-10 00:00:00', 'Asia/Tokyo')

      expect(def.format('YYYY/MM/DD HH:mm:ss')).toBe('1985/10/10 00:00:00')
      expect(tokyo.format('YYYY/MM/DD HH:mm:ss')).toBe('1985/10/10 00:00:00')
    })
  })

  describe('createYmd', () => {
    test('creates a new ymd object', () => {
      const expected = {
        year: 1985,
        month: 10,
        date: 10
      }

      expect(Day.createYmd(1985, 10, 10)).toEqual(expected)
    })

    test('creates a new ymd object from a day instance', () => {
      const expected = {
        year: 1985,
        month: 10,
        date: 10
      }

      expect(Day.createYmd(Day.day('1985-10-10'))).toEqual(expected)
    })

    test('all fields are `null` by default', () => {
      const expected = {
        year: null,
        month: null,
        date: null
      }

      expect(Day.createYmd()).toEqual(expected)
    })
  })

  describe('createHms', () => {
    test('creates a new hms object', () => {
      const expected = {
        hour: '10',
        minute: '20',
        second: '30'
      }

      expect(Day.createHms('10', '20', '30')).toEqual(expected)
    })

    test('creates a new hms object from a day instance', () => {
      const expected = {
        hour: '10',
        minute: '20',
        second: '30'
      }

      expect(Day.createHms(Day.day('1985-10-10 10:20:30'))).toEqual(expected)
    })

    test('all fields are `null` by default', () => {
      const expected = {
        hour: null,
        minute: null,
        second: null
      }

      expect(Day.createHms()).toEqual(expected)
    })
  })
})

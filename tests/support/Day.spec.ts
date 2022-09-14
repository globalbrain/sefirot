import * as Day from 'sefirot/support/Day'

describe('support/Day', () => {
  describe('day', () => {
    test('create a new day instance', () => {
      expect(Day.day('1985-10-10').format('YYYY/MM/DD')).toBe('1985/10/10')
    })
  })
})

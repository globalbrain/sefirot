import { hms } from 'sefirot/validation/validators'

describe('validation/validators/hms', () => {
  it('should validate if the hours, minutes, and seconds is valid value', () => {
    expect(hms({ hour: '01', minute: '02', second: '03' })).toBe(true)
    expect(hms({ hour: '01', minute: '02', second: null })).toBe(true)

    expect(hms({ hour: '24', minute: '59', second: '59' })).toBe(false)
    expect(hms({ hour: '23', minute: '60', second: '59' })).toBe(false)
    expect(hms({ hour: '23', minute: '59', second: '60' })).toBe(false)

    expect(hms({})).toBe(false)
    expect(hms({ hour: '23' })).toBe(false)
    expect(hms({ hour: '23', minute: '59' })).toBe(false)
  })

  it('should validate only the given types', () => {
    expect(hms({ hour: '23', minute: '59', second: '60' }, ['h', 'm'])).toBe(true)
    expect(hms({ hour: '23', minute: '60', second: '60' }, ['h', 'm'])).toBe(false)
    expect(hms({ hour: '23', minute: '59' }, ['h', 'm'])).toBe(true)
    expect(hms({ hour: '23', minute: null }, ['h', 'm'])).toBe(true)

    expect(hms({ hour: '23' }, ['h', 'm'])).toBe(false)
    expect(hms({ hour: '23', minute: undefined }, ['h', 'm'])).toBe(false)
  })
})

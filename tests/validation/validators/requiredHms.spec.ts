import { requiredHms } from 'sefirot/validation/validators'

describe('validation/validators/requiredHms', () => {
  test('validates if the hours, minutes, and seconds are present', () => {
    expect(requiredHms({ hour: '01', minute: '02', second: '03' })).toBe(true)

    expect(requiredHms(undefined)).toBe(false)
    expect(requiredHms(null)).toBe(false)
    expect(requiredHms(true)).toBe(false)
    expect(requiredHms(false)).toBe(false)
    expect(requiredHms(1)).toBe(false)
    expect(requiredHms('abc')).toBe(false)
    expect(requiredHms({})).toBe(false)
    expect(requiredHms({ hour: '01' })).toBe(false)
    expect(requiredHms({ hour: '01', minute: '02' })).toBe(false)
    expect(requiredHms({ hour: null, minute: null, second: null })).toBe(false)
    expect(requiredHms({ hour: '01', minute: '03', second: null })).toBe(false)
    expect(requiredHms([])).toBe(false)
  })

  test('validates only given types', () => {
    expect(requiredHms({ hour: '01', minute: '02', second: null }, ['h', 'm'])).toBe(true)
    expect(requiredHms({ hour: '01', minute: '02' }, ['h', 'm'])).toBe(true)

    expect(requiredHms(undefined)).toBe(false)
    expect(requiredHms(null)).toBe(false)
    expect(requiredHms(true)).toBe(false)
    expect(requiredHms(false)).toBe(false)
    expect(requiredHms(1, ['h', 'm'])).toBe(false)
    expect(requiredHms('abc', ['h', 'm'])).toBe(false)
    expect(requiredHms({}, ['h', 'm'])).toBe(false)
    expect(requiredHms({ hour: '01' }, ['h', 'm'])).toBe(false)
    expect(requiredHms({ hour: '01', minute: undefined }, ['h', 'm'])).toBe(false)
    expect(requiredHms({ hour: '01', minute: null }, ['h', 'm'])).toBe(false)
    expect(requiredHms([], ['h', 'm'])).toBe(false)
  })
})

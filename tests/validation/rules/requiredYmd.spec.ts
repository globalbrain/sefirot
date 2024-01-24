import { requiredYmd } from 'sefirot/validation/rules'

describe('validation/rules/requiredYmd', () => {
  test('validates if the hours, minutes, and seconds are present', () => {
    const rule = requiredYmd()

    expect(rule.$validator({ year: 2000, month: 12, date: 31 }, null, null)).toBe(true)

    expect(rule.$validator(undefined, null, null)).toBe(false)
    expect(rule.$validator(null, null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator('abc', null, null)).toBe(false)
    expect(rule.$validator({ year: null, month: null, date: null }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: null, date: 2 }, null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: 12 }, null, null)).toBe(false)
    expect(rule.$validator([], null, null)).toBe(false)
  })

  test('validates only given types', () => {
    const rule = requiredYmd(['y', 'm'])

    expect(rule.$validator({ year: 2000, month: 12, date: null }, null, null)).toBe(true)
    expect(rule.$validator({ year: 2000, month: 12 }, null, null)).toBe(true)

    expect(rule.$validator(undefined, null, null)).toBe(false)
    expect(rule.$validator(null, null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator('abc', null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: undefined }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: null }, null, null)).toBe(false)
    expect(rule.$validator([], null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = requiredYmd()
    expect(rule.$message({ $params: {} })).toBe('The field is required.')
  })

  test('it can set custom error message', () => {
    const rule = requiredYmd(['y', 'm', 'd'], 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

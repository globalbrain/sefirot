import { ymd } from 'sefirot/validation/rules'

describe('validation/rules/ymd', () => {
  it('should validate if the year, month, and date is valid value', () => {
    const rule = ymd()

    expect(rule.$validator({ year: 1, month: 1, date: 1 }, null, null)).toBe(true)
    expect(rule.$validator({ year: 9999, month: 12, date: null }, null, null)).toBe(true)

    expect(rule.$validator(undefined, null, null)).toBe(false)
    expect(rule.$validator(null, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: null, date: 1 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 0, month: 12, date: 1 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 10000, month: 12, date: 1 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: 0, date: 1 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: 13, date: 1 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: 1, date: 32 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: 2, date: 30 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: 4, date: 31 }, null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: 4 }, null, null)).toBe(false)
  })

  it('should validate only the given types', () => {
    const rule = ymd(['y', 'm'])

    expect(rule.$validator({ year: 2000, month: 12, date: 32 }, null, null)).toBe(true)
    expect(rule.$validator({ year: 2000, month: null }, null, null)).toBe(true)

    expect(rule.$validator(undefined, null, null)).toBe(false)
    expect(rule.$validator(null, null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: 13, date: 13 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: 13 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000 }, null, null)).toBe(false)
    expect(rule.$validator({ year: 2000, month: undefined }, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = ymd()
    expect(rule.$message({ $params: {} })).toBe('The field is required.')
  })

  test('custom error message', () => {
    const rule = ymd(['y', 'm', 'd'], 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

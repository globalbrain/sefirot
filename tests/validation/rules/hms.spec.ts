import { hms } from 'sefirot/validation/rules'

describe('validation/rules/hms', () => {
  it('should validate if the hours, minutes, and seconds is valid value', () => {
    const rule = hms()

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator({ hour: '01', minute: '02', second: '03' }, null, null)).toBe(true)
    expect(rule.$validator({ hour: '01', minute: '02', second: null }, null, null)).toBe(true)

    expect(rule.$validator({}, null, null)).toBe(false)
    expect(rule.$validator({ hour: '24', minute: '59', second: '59' }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '23', minute: '60', second: '59' }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '23', minute: '59', second: '60' }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '23' }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '23', minute: '59' }, null, null)).toBe(false)
  })

  it('should validate only the given types', () => {
    const rule = hms(['h', 'm'])

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator({ hour: '23', minute: '59', second: '59' }, null, null)).toBe(true)
    expect(rule.$validator({ hour: '23', minute: '59', second: '60' }, null, null)).toBe(true)
    expect(rule.$validator({ hour: '23', minute: '59' }, null, null)).toBe(true)
    expect(rule.$validator({ hour: '23', minute: null }, null, null)).toBe(true)

    expect(rule.$validator({}, null, null)).toBe(false)
    expect(rule.$validator({ hour: '23' }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '23', minute: undefined }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '23', minute: '60', second: '60' }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '24', minute: '59', second: '60' }, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = hms()
    expect(rule.$message({ $params: {} })).toBe('The time is invalid.')
  })

  test('custom error message', () => {
    const rule = hms(['h', 'm', 's'], 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

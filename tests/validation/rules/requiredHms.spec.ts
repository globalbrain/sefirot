import { requiredHms } from 'sefirot/validation/rules'

describe('validation/rules/requiredHms', () => {
  it('validates if the hours, minutes, and seconds are present', () => {
    const rule = requiredHms()

    expect(rule.$validator({ hour: '01', minute: '02', second: '03' }, null, null)).toBe(true)

    expect(rule.$validator(undefined, null, null)).toBe(false)
    expect(rule.$validator(null, null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator('abc', null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
    expect(rule.$validator({ hour: '01' }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '01', minute: '02' }, null, null)).toBe(false)
    expect(rule.$validator({ hour: null, minute: null, second: null }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '01', minute: '03', second: null }, null, null)).toBe(false)
    expect(rule.$validator([], null, null)).toBe(false)
  })

  it('validates only given types', () => {
    const rule = requiredHms(['h', 'm'])

    expect(rule.$validator({ hour: '01', minute: '02', second: null }, null, null)).toBe(true)
    expect(rule.$validator({ hour: '01', minute: '02' }, null, null)).toBe(true)

    expect(rule.$validator(undefined, null, null)).toBe(false)
    expect(rule.$validator(null, null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator('abc', null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
    expect(rule.$validator({ hour: '01' }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '01', minute: undefined }, null, null)).toBe(false)
    expect(rule.$validator({ hour: '01', minute: null }, null, null)).toBe(false)
    expect(rule.$validator([], null, null)).toBe(false)
  })

  it('shows the default error message', () => {
    const rule = requiredHms()
    expect(rule.$message({ $params: {} })).toBe('The field is required.')
  })

  it('uses the custom error message', () => {
    const rule = requiredHms(['h', 'm', 's'], 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

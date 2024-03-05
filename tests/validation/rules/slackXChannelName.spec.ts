import { slackXChannelName } from 'sefirot/validation/rules'

describe('validation/rules/slackXChannelName', () => {
  test('it validates whether the value is valid', () => {
    const rule = slackXChannelName()

    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator('1'.repeat(78), null, null)).toBe(true)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)

    expect(rule.$validator('1'.repeat(79), null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = slackXChannelName()
    expect(rule.$message({ $params: {} })).toBe('The value must be less than or equal to 78 characters.')
  })

  test('it can set custom error message', () => {
    const rule = slackXChannelName('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

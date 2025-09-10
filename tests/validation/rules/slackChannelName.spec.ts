import { slackChannelName } from 'sefirot/validation/rules'

describe('validation/rules/slackChannelName', () => {
  it('validates Slack channel names', () => {
    const rule = slackChannelName()

    expect(rule.$validator('1'.repeat(80), null, null)).toBe(true)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)

    expect(rule.$validator('1'.repeat(81), null, null)).toBe(false)
    expect(rule.$validator(' ', null, null)).toBe(false)
    expect(rule.$validator(',', null, null)).toBe(false)
    expect(rule.$validator('.', null, null)).toBe(false)
    expect(rule.$validator('!', null, null)).toBe(false)
    expect(rule.$validator('@', null, null)).toBe(false)
    expect(rule.$validator('#', null, null)).toBe(false)
    expect(rule.$validator('$', null, null)).toBe(false)
    expect(rule.$validator('%', null, null)).toBe(false)
    expect(rule.$validator('^', null, null)).toBe(false)
    expect(rule.$validator('&', null, null)).toBe(false)
    expect(rule.$validator('*', null, null)).toBe(false)
    expect(rule.$validator('?', null, null)).toBe(false)
    expect(rule.$validator('(', null, null)).toBe(false)
    expect(rule.$validator(')', null, null)).toBe(false)
    expect(rule.$validator('{', null, null)).toBe(false)
    expect(rule.$validator('}', null, null)).toBe(false)
    expect(rule.$validator('<', null, null)).toBe(false)
    expect(rule.$validator('>', null, null)).toBe(false)
    expect(rule.$validator('=', null, null)).toBe(false)
    expect(rule.$validator('+', null, null)).toBe(false)
    expect(rule.$validator('|', null, null)).toBe(false)
    expect(rule.$validator('・', null, null)).toBe(false)
    expect(rule.$validator('\'', null, null)).toBe(false)
    expect(rule.$validator('`', null, null)).toBe(false)
    expect(rule.$validator('~', null, null)).toBe(false)
    expect(rule.$validator('/', null, null)).toBe(false)
    expect(rule.$validator('\\', null, null)).toBe(false)
    expect(rule.$validator('[', null, null)).toBe(false)
    expect(rule.$validator(']', null, null)).toBe(false)
    expect(rule.$validator('"', null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  it.skip('validates the value with an offset', () => {
    const rule = slackChannelName({
      offset: 10
    })

    expect(rule.$validator('1'.repeat(70), null, null)).toBe(true)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)

    expect(rule.$validator('1'.repeat(71), null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  it.skip('shows the default error message', () => {
    const rule = slackChannelName()
    expect(rule.$message({ $params: {} })).toBe('The slack channel name is invalid.')
  })

  it.skip('uses the custom error message', () => {
    const rule = slackChannelName({}, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

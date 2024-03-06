import { slackChannelName } from 'sefirot/validation/rules'

describe('validation/rules/slackChannelName', () => {
  test('it validates whether the value is valid', () => {
    const rule = slackChannelName()

    expect(rule.$validator('', null, null)).toBe(true)
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
    // eslint-disable-next-line @typescript-eslint/quotes
    expect(rule.$validator("'", null, null)).toBe(false)
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

  test('it validates whether the value is valid with prefix', () => {
    const rule = slackChannelName({
      prefix: 'prefix_'
    })

    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator('1'.repeat(73), null, null)).toBe(true)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)

    expect(rule.$validator('1'.repeat(74), null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  test('it validates whether the value is valid with suffix', () => {
    const rule = slackChannelName({
      suffix: 'suffix_'
    })

    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator('1'.repeat(73), null, null)).toBe(true)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)

    expect(rule.$validator('1'.repeat(74), null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  test('it validates whether the value is valid with prefix and suffix', () => {
    const rule = slackChannelName({
      prefix: 'prefix_',
      suffix: 'suffix_'
    })

    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator('1'.repeat(66), null, null)).toBe(true)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)

    expect(rule.$validator('1'.repeat(67), null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(false, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = slackChannelName()
    expect(rule.$message({ $params: {} })).toBe('The slack channel name is invalid.')
  })

  test('it can set custom error message', () => {
    const rule = slackChannelName({}, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

import { slackChannelName } from 'sefirot/validation/validators'

describe('validation/validators/slackChannelName', () => {
  test('it validates whether the value is valid', () => {
    expect(slackChannelName('1'.repeat(80))).toBe(true)

    expect(slackChannelName('')).toBe(false)
    expect(slackChannelName('1'.repeat(81))).toBe(false)
    expect(slackChannelName(' ')).toBe(false)
    expect(slackChannelName(',')).toBe(false)
    expect(slackChannelName('.')).toBe(false)
    expect(slackChannelName('!')).toBe(false)
    expect(slackChannelName('@')).toBe(false)
    expect(slackChannelName('#')).toBe(false)
    expect(slackChannelName('$')).toBe(false)
    expect(slackChannelName('%')).toBe(false)
    expect(slackChannelName('^')).toBe(false)
    expect(slackChannelName('&')).toBe(false)
    expect(slackChannelName('*')).toBe(false)
    expect(slackChannelName('?')).toBe(false)
    expect(slackChannelName('(')).toBe(false)
    expect(slackChannelName(')')).toBe(false)
    expect(slackChannelName('{')).toBe(false)
    expect(slackChannelName('}')).toBe(false)
    expect(slackChannelName('<')).toBe(false)
    expect(slackChannelName('>')).toBe(false)
    expect(slackChannelName('=')).toBe(false)
    expect(slackChannelName('+')).toBe(false)
    expect(slackChannelName('|')).toBe(false)
    expect(slackChannelName('・')).toBe(false)
    // eslint-disable-next-line @typescript-eslint/quotes
    expect(slackChannelName("'")).toBe(false)
    expect(slackChannelName('`')).toBe(false)
    expect(slackChannelName('~')).toBe(false)
    expect(slackChannelName('/')).toBe(false)
    expect(slackChannelName('\\')).toBe(false)
    expect(slackChannelName('[')).toBe(false)
    expect(slackChannelName(']')).toBe(false)
    expect(slackChannelName('"')).toBe(false)
    expect(slackChannelName(undefined)).toBe(false)
    expect(slackChannelName(null)).toBe(false)
    expect(slackChannelName(true)).toBe(false)
    expect(slackChannelName(false)).toBe(false)
    expect(slackChannelName(1)).toBe(false)
    expect(slackChannelName([])).toBe(false)
    expect(slackChannelName({})).toBe(false)
  })

  test('it validates whether the value is valid with offset', () => {
    const options = {
      offset: 10
    }

    expect(slackChannelName('1'.repeat(70), options)).toBe(true)

    expect(slackChannelName('', options)).toBe(false)
    expect(slackChannelName('1'.repeat(71), options)).toBe(false)
    expect(slackChannelName(undefined, options)).toBe(false)
    expect(slackChannelName(null, options)).toBe(false)
    expect(slackChannelName(true, options)).toBe(false)
    expect(slackChannelName(false, options)).toBe(false)
    expect(slackChannelName(1, options)).toBe(false)
    expect(slackChannelName([], options)).toBe(false)
    expect(slackChannelName({}, options)).toBe(false)
  })
})

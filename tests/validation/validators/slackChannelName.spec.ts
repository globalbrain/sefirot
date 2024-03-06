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

  test('it validates whether the value is valid with prefix', () => {
    const options = {
      prefix: 'prefix_'
    }

    expect(slackChannelName(`prefix_${'1'.repeat(73)}`, options)).toBe(true)

    expect(slackChannelName('', options)).toBe(false)
    expect(slackChannelName(`prefix_${'1'.repeat(74)}`, options)).toBe(false)
    expect(slackChannelName(undefined, options)).toBe(false)
    expect(slackChannelName(null, options)).toBe(false)
    expect(slackChannelName(true, options)).toBe(false)
    expect(slackChannelName(false, options)).toBe(false)
    expect(slackChannelName(1, options)).toBe(false)
    expect(slackChannelName([], options)).toBe(false)
    expect(slackChannelName({}, options)).toBe(false)
  })

  test('it validates whether the value is valid with suffix', () => {
    const options = {
      suffix: '_suffix'
    }

    expect(slackChannelName(`${'1'.repeat(73)}_suffix`, options)).toBe(true)

    expect(slackChannelName('', options)).toBe(false)
    expect(slackChannelName(`${'1'.repeat(74)}_suffix`, options)).toBe(false)
    expect(slackChannelName(undefined, options)).toBe(false)
    expect(slackChannelName(null, options)).toBe(false)
    expect(slackChannelName(true, options)).toBe(false)
    expect(slackChannelName(false, options)).toBe(false)
    expect(slackChannelName(1, options)).toBe(false)
    expect(slackChannelName([], options)).toBe(false)
    expect(slackChannelName({}, options)).toBe(false)
  })

  test('it validates whether the value is valid with prefix and suffix', () => {
    const options = {
      prefix: 'prefix_',
      suffix: '_suffix'
    }

    expect(slackChannelName(`prefix_${'1'.repeat(66)}_suffix`, options)).toBe(true)

    expect(slackChannelName('', options)).toBe(false)
    expect(slackChannelName(`prefix_${'1'.repeat(67)}_suffix`, options)).toBe(false)
    expect(slackChannelName(undefined, options)).toBe(false)
    expect(slackChannelName(null, options)).toBe(false)
    expect(slackChannelName(true, options)).toBe(false)
    expect(slackChannelName(false, options)).toBe(false)
    expect(slackChannelName(1, options)).toBe(false)
    expect(slackChannelName([], options)).toBe(false)
    expect(slackChannelName({}, options)).toBe(false)
  })
})

import { slackChannelName } from 'sefirot/validation/validators'

describe('validation/validators/slackChannelName', () => {
  test('it validates whether the value is valid', () => {
    expect(slackChannelName('')).toBe(true)
    expect(slackChannelName('1'.repeat(80))).toBe(true)

    expect(slackChannelName('1'.repeat(81))).toBe(false)
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

    expect(slackChannelName('', options)).toBe(true)
    expect(slackChannelName('1'.repeat(73), options)).toBe(true)

    expect(slackChannelName('1'.repeat(74), options)).toBe(false)
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
      suffix: 'suffix_'
    }

    expect(slackChannelName('', options)).toBe(true)
    expect(slackChannelName('1'.repeat(73), options)).toBe(true)

    expect(slackChannelName('1'.repeat(74), options)).toBe(false)
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
      suffix: 'suffix_'
    }

    expect(slackChannelName('', options)).toBe(true)
    expect(slackChannelName('1'.repeat(66), options)).toBe(true)

    expect(slackChannelName('1'.repeat(67), options)).toBe(false)
    expect(slackChannelName(undefined, options)).toBe(false)
    expect(slackChannelName(null, options)).toBe(false)
    expect(slackChannelName(true, options)).toBe(false)
    expect(slackChannelName(false, options)).toBe(false)
    expect(slackChannelName(1, options)).toBe(false)
    expect(slackChannelName([], options)).toBe(false)
    expect(slackChannelName({}, options)).toBe(false)
  })
})

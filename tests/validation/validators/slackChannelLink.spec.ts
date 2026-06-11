import { slackChannelLink } from 'sefirot/validation/validators'

describe('validation/validators/slackChannelLink', () => {
  it('accepts channel links copied from Slack', () => {
    expect(slackChannelLink('https://acme.slack.com/archives/C0123ABCDEF')).toBe(true)
    expect(slackChannelLink('https://my-team.slack.com/archives/G024BE91L')).toBe(true)
  })

  it('accepts message links within a channel', () => {
    expect(slackChannelLink('https://acme.slack.com/archives/C0123ABCDEF/p1700000000000000')).toBe(true)
    expect(slackChannelLink('https://acme.slack.com/archives/C0123ABCDEF/p1700000000000000?thread_ts=1700000000.000000&cid=C0123ABCDEF')).toBe(true)
  })

  it('accepts browser client urls', () => {
    expect(slackChannelLink('https://app.slack.com/client/T024BE7LD/C0123ABCDEF')).toBe(true)
    expect(slackChannelLink('https://app.slack.com/client/T024BE7LD/C0123ABCDEF/thread/C0123ABCDEF-1700000000.000000')).toBe(true)
  })

  it('accepts enterprise grid hosts', () => {
    expect(slackChannelLink('https://acme-dev.enterprise.slack.com/archives/C0123ABCDEF')).toBe(true)
    expect(slackChannelLink('https://acme.enterprise.slack.com/archives/C0123ABCDEF')).toBe(true)
  })

  it('accepts a raw channel id', () => {
    expect(slackChannelLink('C0123ABCDEF')).toBe(true)
    expect(slackChannelLink('G024BE91L')).toBe(true)
  })

  it('accepts a value with surrounding whitespace', () => {
    expect(slackChannelLink(' https://acme.slack.com/archives/C0123ABCDEF ')).toBe(true)
  })

  it('rejects non-slack hosts', () => {
    expect(slackChannelLink('https://evil.com/archives/C0123ABCDEF')).toBe(false)
    expect(slackChannelLink('https://slack.com.evil.com/archives/C0123ABCDEF')).toBe(false)
    expect(slackChannelLink('https://fakeslack.com/archives/C0123ABCDEF')).toBe(false)
  })

  it('rejects non-https schemes', () => {
    expect(slackChannelLink('http://acme.slack.com/archives/C0123ABCDEF')).toBe(false)
  })

  it('rejects urls without a channel id', () => {
    expect(slackChannelLink('https://acme.slack.com')).toBe(false)
    expect(slackChannelLink('https://acme.slack.com/archives')).toBe(false)
    expect(slackChannelLink('https://app.slack.com/client/T024BE7LD')).toBe(false)
  })

  it('rejects ids that are not channel ids', () => {
    expect(slackChannelLink('https://acme.slack.com/archives/D0123ABCDEF')).toBe(false)
    expect(slackChannelLink('D0123ABCDEF')).toBe(false)
    expect(slackChannelLink('c0123abcdef')).toBe(false)
  })

  it('rejects channel names and other plain text', () => {
    expect(slackChannelLink('general')).toBe(false)
    expect(slackChannelLink('#general')).toBe(false)
    expect(slackChannelLink('not a link')).toBe(false)
  })

  it('rejects non-string values', () => {
    expect(slackChannelLink(null)).toBe(false)
    expect(slackChannelLink(undefined)).toBe(false)
    expect(slackChannelLink(123)).toBe(false)
    expect(slackChannelLink({})).toBe(false)
    expect(slackChannelLink([])).toBe(false)
  })

  it('rejects empty string', () => {
    expect(slackChannelLink('')).toBe(false)
    expect(slackChannelLink(' ')).toBe(false)
  })
})

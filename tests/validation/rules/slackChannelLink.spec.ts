import { slackChannelLink } from 'sefirot/validation/rules'

describe('validation/rules/slackChannelLink', () => {
  it('validates Slack channel links', () => {
    const rule = slackChannelLink()

    expect(rule.$validator('https://acme.slack.com/archives/C0123ABCDEF', null, null)).toBe(true)
    expect(rule.$validator('https://app.slack.com/client/T024BE7LD/C0123ABCDEF', null, null)).toBe(true)
    expect(rule.$validator('C0123ABCDEF', null, null)).toBe(true)
    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator('', null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)

    expect(rule.$validator('https://evil.com/archives/C0123ABCDEF', null, null)).toBe(false)
    expect(rule.$validator('general', null, null)).toBe(false)
    expect(rule.$validator('#general', null, null)).toBe(false)
    expect(rule.$validator(true, null, null)).toBe(false)
    expect(rule.$validator(1, null, null)).toBe(false)
    expect(rule.$validator({}, null, null)).toBe(false)
  })

  it('shows the default error message', () => {
    const rule = slackChannelLink()
    expect(rule.$message({ $params: {} })).toBe('The slack channel link is invalid.')
  })

  it('uses the custom error message', () => {
    const rule = slackChannelLink('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

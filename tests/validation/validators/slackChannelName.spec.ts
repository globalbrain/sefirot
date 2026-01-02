import { slackChannelName } from 'sefirot/validation/validators'

const invalidChars = [
  ' ', '・', ',', '!', '?', '.', '"', '(', ')', '[', ']', '{', '}', '@', '*',
  '/', '\'', '\\', '&', '#', '%', '`', '^', '+', '<', '=', '>', '|', '~', '$'
]

describe('validation/validators/slackChannelName', () => {
  it('accepts basic valid names', () => {
    expect(slackChannelName('general')).toBe(true)
    expect(slackChannelName('project_alpha')).toBe(true)
    expect(slackChannelName('team-123')).toBe(true)
  })

  it('enforces lowercase', () => {
    expect(slackChannelName('General')).toBe(false)
    expect(slackChannelName('team_X')).toBe(false)
  })

  it('rejects spaces and disallowed punctuation', () => {
    expect(slackChannelName('project alpha')).toBe(false)
    expect(slackChannelName('foo.bar')).toBe(false)
    expect(slackChannelName('foo/bar')).toBe(false)
    expect(slackChannelName('@team')).toBe(false)
    expect(slackChannelName('team!')).toBe(false)
  })

  it('supports unicode letters and digits', () => {
    expect(slackChannelName('münchen')).toBe(true)
    expect(slackChannelName('東京')).toBe(true)
    expect(slackChannelName('канал123')).toBe(true)
    expect(slackChannelName('a-z09ぁんァヶー一龯_')).toBe(true)
  })

  it('rejects emoji and symbols', () => {
    expect(slackChannelName('dev🔥')).toBe(false)
    expect(slackChannelName('sales™')).toBe(false)
  })

  it('enforces max length', () => {
    const name79 = 'a'.repeat(79)
    const name80 = 'a'.repeat(80)
    const name81 = 'a'.repeat(81)

    expect(slackChannelName(name79)).toBe(true)
    expect(slackChannelName(name80)).toBe(true)
    expect(slackChannelName(name81)).toBe(false)
  })

  it('applies the offset when checking max length', () => {
    const nameOK = 'a'.repeat(79)
    const nameTooLong = 'a'.repeat(80)

    expect(slackChannelName(nameOK, { offset: 1 })).toBe(true)
    expect(slackChannelName(nameTooLong, { offset: 1 })).toBe(false)
  })

  it('rejects non-string values', () => {
    expect(slackChannelName(null)).toBe(false)
    expect(slackChannelName(undefined)).toBe(false)
    expect(slackChannelName(123)).toBe(false)
    expect(slackChannelName({})).toBe(false)
    expect(slackChannelName([])).toBe(false)
  })

  it('rejects empty string', () => {
    expect(slackChannelName('')).toBe(false)
    expect(slackChannelName(' ')).toBe(false)
  })

  it('rejects strings made only of combining marks', () => {
    const onlyCombining = '\u0301\u0302\u0308'
    expect(slackChannelName(onlyCombining)).toBe(false)
  })

  it('rejects names with invalid characters', () => {
    for (const char of invalidChars) {
      const name = `team${char}name`
      expect(slackChannelName(name), `should reject ${JSON.stringify(char)}`).toBe(false)
    }
  })
})

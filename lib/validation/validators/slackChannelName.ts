export interface SlackChannelNameOptions {
  offset?: number
}

export function slackChannelName(value: unknown, options: SlackChannelNameOptions = {}): boolean {
  if (typeof value !== 'string') { return false }

  const { offset = 0 } = options
  const maxLength = /* Slack channel name max length */ 80 - offset

  return new RegExp(`^[\\p{Ll}\\p{Lm}\\p{Lo}\\p{M}\\p{N}_-]{1,${maxLength}}$`, 'u').test(value)
}

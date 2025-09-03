export interface SlackChannelNameOptions {
  offset?: number
}

export function slackChannelName(
  value: unknown,
  { offset = 0 }: SlackChannelNameOptions = {}
): boolean {
  return (
    typeof value === 'string'
    && /^[\p{L}\p{N}\p{M}_-]+$/u.test(value)
    && value.length <= 80 - offset
    && value.toLowerCase() === value
  )
}

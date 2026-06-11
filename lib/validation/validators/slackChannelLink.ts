const channelIdRE = /^[CG][A-Z0-9]{6,}$/

/**
 * Checks that the value identifies a Slack channel. Accepts a channel link as
 * copied from Slack (`https://<workspace>.slack.com/archives/<id>`, with or
 * without a trailing message path), a browser URL
 * (`https://app.slack.com/client/<team-id>/<id>`), or a raw channel ID.
 * Mirrors the backend `slack_channel_link` rule definition.
 */
export function slackChannelLink(value: unknown): boolean {
  return typeof value === 'string' && extractChannelId(value) !== null
}

function extractChannelId(value: string): string | null {
  const trimmed = value.trim()

  if (channelIdRE.test(trimmed)) {
    return trimmed
  }

  return extractChannelIdFromUrl(trimmed)
}

function extractChannelIdFromUrl(value: string): string | null {
  let url: URL

  try {
    url = new URL(value)
  } catch {
    return null
  }

  if (url.protocol !== 'https:') {
    return null
  }

  if (url.hostname !== 'slack.com' && !url.hostname.endsWith('.slack.com')) {
    return null
  }

  const segments = url.pathname.split('/').filter((segment) => segment !== '')

  let candidate: string | undefined

  if (segments[0] === 'archives') {
    candidate = segments[1]
  } else if (url.hostname === 'app.slack.com' && segments[0] === 'client') {
    candidate = segments[2]
  }

  return candidate !== undefined && channelIdRE.test(candidate) ? candidate : null
}

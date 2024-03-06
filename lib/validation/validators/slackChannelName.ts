import { isString } from '../../support/Utils'

export interface SlackChannelNameOptions {
  prefix?: string
  suffix?: string
}

const SLACK_CHANNEL_NAME_MAX_LENGTH = 80 as const

export function slackChannelName(value: unknown, options: SlackChannelNameOptions = {}): boolean {
  if (!isString(value)) {
    return false
  }

  const {
    prefix = '',
    suffix = ''
  } = options
  const maxLength = SLACK_CHANNEL_NAME_MAX_LENGTH - prefix.length - suffix.length

  return new RegExp(`^${prefix}\[\\p\{L\}\\p\{M\}\\p\{N\}_-\]\{1,${maxLength}\}${suffix}\$`, 'u').test(value)
}

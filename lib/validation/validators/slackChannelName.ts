import { isString } from '../../support/Utils'

export const SLACK_CHANNEL_NAME_MAX_LENGTH = 80 as const

export interface SlackChannelNameOptions {
  prefix?: string
  suffix?: string
}

export function slackChannelName(value: unknown, options: SlackChannelNameOptions = {}): boolean {
  if (!isString(value)) {
    return false
  }

  return value.length <= getSlackChannelNameMaxLength(options)
}

export function getSlackChannelNameMaxLength(options: SlackChannelNameOptions) {
  const {
    prefix = '',
    suffix = ''
  } = options

  return SLACK_CHANNEL_NAME_MAX_LENGTH - prefix.length - suffix.length
}

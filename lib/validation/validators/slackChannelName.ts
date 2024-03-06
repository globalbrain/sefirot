import { isString } from '../../support/Utils'

const SLACK_CHANNEL_NAME_MAX_LENGTH = 80 as const
const SLACK_CHANNEL_NAME_INVALID_SYMBOLS = /[ ,.!@#$%^&*?(){}<>=+|・'`~/\\\[\]\"]/

export interface SlackChannelNameOptions {
  prefix?: string
  suffix?: string
}

export function slackChannelName(value: unknown, options: SlackChannelNameOptions = {}): boolean {
  if (!isString(value)) {
    return false
  }

  const {
    prefix = '',
    suffix = ''
  } = options

  return (
    !SLACK_CHANNEL_NAME_INVALID_SYMBOLS.exec(value)
    && value.length <= SLACK_CHANNEL_NAME_MAX_LENGTH - prefix.length - suffix.length
  )
}

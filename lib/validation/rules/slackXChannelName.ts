import { slackChannelName } from './slackChannelName'

export function slackXChannelName(msg?: string) {
  return slackChannelName({ prefix: 'x_' }, msg)
}

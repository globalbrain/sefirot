import { createRule } from '../Rule'
import { type SlackChannelNameOptions, slackChannelName as baseSlackChannelName } from '../validators'

export const message = {
  en: 'The slack channel name is invalid.',
  ja: 'Slackチャンネル名の形式が正しくありません。'
}

export function slackChannelName(options?: SlackChannelNameOptions, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => baseSlackChannelName(value, options)
  })
}

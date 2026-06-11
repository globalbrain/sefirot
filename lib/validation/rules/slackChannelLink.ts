import { createRule } from '../Rule'
import { slackChannelLink as baseSlackChannelLink } from '../validators'

export const message = {
  en: 'The slack channel link is invalid.',
  ja: 'Slackチャンネルリンクの形式が正しくありません。'
}

export function slackChannelLink(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: baseSlackChannelLink
  })
}

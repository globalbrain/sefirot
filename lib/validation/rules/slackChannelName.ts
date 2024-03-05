import { createRule } from '../Rule'
import { type SlackChannelNameOptions, slackChannelName as baseSlackChannelName, getSlackChannelNameMaxLength } from '../validators'

export const message = {
  en: (length: number) => `The value must be less than or equal to ${length} characters.`,
  ja: (length: number) => `この値は最大${length}文字までです。`
}

export function slackChannelName(options?: SlackChannelNameOptions, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](getSlackChannelNameMaxLength(options ?? {})),
    optional: true,
    validation: (value) => baseSlackChannelName(value, options)
  })
}

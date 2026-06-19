export type Rule =
  | MaxLengthRule
  | RequiredRule
  | UniqueRule
  | SlackChannelLinkRule
  | SlackChannelNameRule
  | BeforeRule
  | BeforeOrEqualRule
  | AfterRule
  | AfterOrEqualRule

export interface MaxLengthRule {
  type: 'max_length'
  length: number
}

export interface RequiredRule {
  type: 'required'
}

export interface UniqueRule {
  type: 'unique'
}

export interface SlackChannelLinkRule {
  type: 'slack_channel_link'
}

export interface SlackChannelNameRule {
  type: 'slack_channel_name'
  offset: number
}

export interface BeforeRule {
  type: 'before'
  date: string
}

export interface BeforeOrEqualRule {
  type: 'before_or_equal'
  date: string
}

export interface AfterRule {
  type: 'after'
  date: string
}

export interface AfterOrEqualRule {
  type: 'after_or_equal'
  date: string
}

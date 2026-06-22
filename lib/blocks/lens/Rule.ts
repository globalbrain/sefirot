export type Rule =
  | MaxLengthRule
  | MinLengthRule
  | MinValueRule
  | MaxValueRule
  | RequiredRule
  | UniqueRule
  | EmailRule
  | UrlRule
  | DecimalRule
  | DecimalOrHyphenRule
  | PositiveIntegerRule
  | NegativeIntegerRule
  | ZeroOrPositiveIntegerRule
  | ZeroOrNegativeIntegerRule
  | CheckedRule
  | SlackChannelLinkRule
  | SlackChannelNameRule
  | BeforeRule
  | BeforeOrEqualRule
  | AfterRule
  | AfterOrEqualRule
  | EachRule

export interface MaxLengthRule {
  type: 'max_length'
  length: number
}

export interface MinLengthRule {
  type: 'min_length'
  length: number
}

export interface MinValueRule {
  type: 'min_value'
  value: number
}

export interface MaxValueRule {
  type: 'max_value'
  value: number
}

export interface EmailRule {
  type: 'email'
}

export interface UrlRule {
  type: 'url'
}

export interface DecimalRule {
  type: 'decimal'
}

export interface DecimalOrHyphenRule {
  type: 'decimal_or_hyphen'
}

export interface PositiveIntegerRule {
  type: 'positive_integer'
}

export interface NegativeIntegerRule {
  type: 'negative_integer'
}

export interface ZeroOrPositiveIntegerRule {
  type: 'zero_or_positive_integer'
}

export interface ZeroOrNegativeIntegerRule {
  type: 'zero_or_negative_integer'
}

export interface CheckedRule {
  type: 'checked'
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

/**
 * Applies the nested `rules` to every element of an array value, mirroring
 * Laravel's `field.*` wildcard on the backend.
 */
export interface EachRule {
  type: 'each'
  rules: Rule[]
}

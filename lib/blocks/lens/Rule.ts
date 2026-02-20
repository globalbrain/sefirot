export type Rule =
  | MaxLengthRule
  | RequiredRule

export interface MaxLengthRule {
  type: 'max_length'
  length: number
}

export interface RequiredRule {
  type: 'required'
}

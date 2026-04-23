export type FilterOperator =
  | '='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  | 'in'

export const FilterOperatorLabelDict: Record<FilterOperator, string> = {
  '=': 'is',
  '!=': 'is not',
  '>': 'greater',
  '>=': 'greater or equal',
  '<': 'less',
  '<=': 'less or equal',
  'in': 'in'
}

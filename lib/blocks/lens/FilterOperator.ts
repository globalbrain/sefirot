export type FilterOperator =
  | '='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  | 'in'
  | 'contains'
  | 'startsWith'
  | 'endsWith'

export const FilterOperatorLabelDict: Record<FilterOperator, string> = {
  '=': 'is',
  '!=': 'is not',
  '>': 'greater',
  '>=': 'greater or equal',
  '<': 'less',
  '<=': 'less or equal',
  'in': 'in',
  'contains': 'contains',
  'startsWith': 'starts with',
  'endsWith': 'ends with'
}

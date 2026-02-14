export type FilterOperator =
  | '='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  | 'in'

export const FilterOperatorTextDict: Record<FilterOperator, string> = {
  '=': 'Is',
  '!=': 'Is not',
  '>': 'Greater',
  '>=': 'Greater or equal',
  '<': 'Less',
  '<=': 'Less or equal',
  'in': 'In'
}

export interface FilterOperatorOption {
  label: string
  value: FilterOperator
}

export const FilterOperatorOptionDict: Record<FilterOperator, FilterOperatorOption> = {
  '=': { label: 'Is', value: '=' },
  '!=': { label: 'Is not', value: '!=' },
  '>': { label: 'Greater', value: '>' },
  '>=': { label: 'Greater or equal', value: '>=' },
  '<': { label: 'Less', value: '<' },
  '<=': { label: 'Less or equal', value: '<=' },
  'in': { label: 'In', value: 'in' }
}

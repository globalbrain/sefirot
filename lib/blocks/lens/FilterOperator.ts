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
  | 'empty'
  | 'notEmpty'

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
  'endsWith': 'ends with',
  'empty': 'is empty',
  'notEmpty': 'is not empty'
}

/**
 * Whether the operator forms a complete condition without a value (the
 * condition value is always `null`). The filter UI renders no value input
 * for such conditions.
 */
export function isValuelessFilterOperator(operator: string | null): boolean {
  return operator === 'empty' || operator === 'notEmpty'
}

/**
 * Whether the condition tuple `[field, operator, value]` no longer
 * carries an effective filter and should be cleared. A condition clears
 * when its value is nullish or an empty array — scalar operators (e.g. a
 * boolean `=`) carry a single value, so `false` is a real value to keep;
 * only `null` clears. Valueless operators are complete without a value,
 * so they never count as cleared.
 */
export function isClearedFilterCondition(condition: any[]): boolean {
  if (isValuelessFilterOperator(condition[1])) {
    return false
  }
  return condition[2] == null || (Array.isArray(condition[2]) && condition[2].length === 0)
}

/**
 * Normalizes the value of valueless operator conditions to `null` across
 * a filters array, groups included. Filters can enter from outside the
 * form UI — the `filters` prop or a hand-edited URL query — where a
 * valueless condition may carry a stray value, so the catalog normalizes
 * them before sending a search, preserving the `[field, operator, null]`
 * wire shape.
 */
export function normalizeValuelessFilterConditions(filters: any[]): any[] {
  return filters.map((f) => {
    if (!Array.isArray(f)) {
      return f
    }
    const entry = f as any[]
    if (entry[0] === '$and' || entry[0] === '$or') {
      return [entry[0], normalizeValuelessFilterConditions(entry[1] ?? [])]
    }
    return isValuelessFilterOperator(entry[1]) && entry[2] !== null
      ? [entry[0], entry[1], null]
      : f
  })
}

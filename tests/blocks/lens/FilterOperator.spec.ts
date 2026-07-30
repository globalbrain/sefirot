import { isClearedFilterCondition, isValuelessFilterOperator } from 'sefirot/blocks/lens/FilterOperator'

describe('blocks/lens/FilterOperator', () => {
  describe('isValuelessFilterOperator', () => {
    it('marks only the empty operators as valueless', () => {
      expect(isValuelessFilterOperator('empty')).toBe(true)
      expect(isValuelessFilterOperator('notEmpty')).toBe(true)
      expect(isValuelessFilterOperator('=')).toBe(false)
      expect(isValuelessFilterOperator('in')).toBe(false)
      expect(isValuelessFilterOperator(null)).toBe(false)
    })
  })

  describe('isClearedFilterCondition', () => {
    it('clears on a nullish value or an empty array', () => {
      expect(isClearedFilterCondition(['status', '=', null])).toBe(true)
      expect(isClearedFilterCondition(['members', 'in', []])).toBe(true)
    })

    it('keeps real values, including false', () => {
      expect(isClearedFilterCondition(['status', '=', false])).toBe(false)
      expect(isClearedFilterCondition(['members', 'in', [1]])).toBe(false)
    })

    it('never clears valueless operator conditions', () => {
      expect(isClearedFilterCondition(['members', 'empty', null])).toBe(false)
      expect(isClearedFilterCondition(['members', 'notEmpty', null])).toBe(false)
    })
  })
})

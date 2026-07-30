import {
  isClearedFilterCondition,
  isValuelessFilterOperator,
  normalizeValuelessFilterConditions
} from 'sefirot/blocks/lens/FilterOperator'

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

  describe('normalizeValuelessFilterConditions', () => {
    it('normalizes stray values on valueless conditions to null', () => {
      expect(normalizeValuelessFilterConditions([
        ['members', 'empty', 42],
        ['reviewers', 'notEmpty', 'x']
      ])).toEqual([
        ['members', 'empty', null],
        ['reviewers', 'notEmpty', null]
      ])
    })

    it('normalizes inside groups', () => {
      expect(normalizeValuelessFilterConditions([
        ['$or', [['members', 'empty', 42], ['age', '>', 30]]]
      ])).toEqual([
        ['$or', [['members', 'empty', null], ['age', '>', 30]]]
      ])
    })

    it('leaves valued conditions untouched, including false values', () => {
      const filters = [['status', '=', false], ['members', 'in', [1, 2]]]
      expect(normalizeValuelessFilterConditions(filters)).toEqual(filters)
    })

    it('leaves already-null valueless conditions untouched', () => {
      const filters = [['members', 'empty', null]]
      expect(normalizeValuelessFilterConditions(filters)).toEqual(filters)
    })
  })
})

import { useD } from 'sefirot/composables/D'
import { useV } from 'sefirot/composables/V'
import { sleep } from 'sefirot/support/Time'
import { requiredIf } from 'sefirot/validation/rules'
import { ref } from 'vue'

describe('validation/rules/requiredIf', () => {
  test('validates if the value is valid', () => {
    [
      { condition: true, result: true },
      { condition: false, result: false },
      { condition: 'string', result: true },
      { condition: '', result: false },
      { condition: () => true, result: true },
      { condition: () => false, result: false },
      { condition: async () => true, result: true },
      { condition: async () => false, result: false }
    ].forEach(({ condition, result }) => {
      const rule = requiredIf(condition)
      const expected = Promise.resolve(result)

      expect(rule.$validator([1], null, null)).toStrictEqual(expected)
      expect(rule.$validator({}, null, null)).toStrictEqual(expected)
      expect(rule.$validator({ a: 1 }, null, null)).toStrictEqual(expected)
      expect(rule.$validator(true, null, null)).toStrictEqual(expected)
      expect(rule.$validator(false, null, null)).toStrictEqual(expected)
      expect(rule.$validator(0, null, null)).toStrictEqual(expected)
      expect(rule.$validator('1', null, null)).toStrictEqual(expected)
      expect(rule.$validator(' 1 ', null, null)).toStrictEqual(expected)
      expect(rule.$validator('🎉', null, null)).toStrictEqual(expected)
      expect(rule.$validator({}, null, null)).toStrictEqual(expected)
      expect(rule.$validator(new Date(1234123412341), null, null)).toStrictEqual(expected)

      expect(rule.$validator(undefined, null, null)).toStrictEqual(expected)
      expect(rule.$validator(null, null, null)).toStrictEqual(expected)
      expect(rule.$validator([], null, null)).toStrictEqual(expected)
      expect(rule.$validator('', null, null)).toStrictEqual(expected)
      expect(rule.$validator('  ', null, null)).toStrictEqual(expected)
      expect(rule.$validator(new Date('a'), null, null)).toStrictEqual(expected)
    })
  })

  test('condition can be reactive', async () => {
    const condition = ref(false)

    const { data } = useD({
      v: null as string | null
    })

    const { validation } = useV(data, {
      v: { requiredIf: requiredIf(() => condition.value) }
    })

    expect(validation.value.$invalid).toBe(false)

    condition.value = true

    // Await since this is async validator.
    await sleep(0)

    expect(validation.value.$invalid).toBe(true)
  })

  test('default error message', () => {
    const rule = requiredIf(true)
    expect(rule.$message({ $params: {} })).toBe('The field is required.')
  })

  test('it can set custom error message', () => {
    const rule = requiredIf(true, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

import { flushPromises } from '@vue/test-utils'
import { useData } from 'sefirot/composables/Data'
import { useValidation } from 'sefirot/composables/Validation'
import { requiredIf } from 'sefirot/validation/rules'
import { ref } from 'vue'

describe('validation/rules/requiredIf', () => {
  it('validates if the value is valid', () => {
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

  it('supports reactive conditions', async () => {
    const condition = ref(false)

    const { data } = useData({
      v: null as string | null
    })

    const { validation } = useValidation(data, {
      v: { required: requiredIf(() => condition.value) }
    })

    expect(validation.value.$invalid).toBe(false)

    condition.value = true

    // await since this is async validator.
    await flushPromises()

    expect(validation.value.$invalid).toBe(true)
  })

  it('shows the default error message', () => {
    const rule = requiredIf(true)
    expect(rule.$message({ $params: {} })).toBe('The field is required.')
  })

  it('uses the custom error message', () => {
    const rule = requiredIf(true, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

import { flushPromises } from '@vue/test-utils'
import { useData } from 'sefirot/composables/Data'
import { useValidation } from 'sefirot/composables/Validation'
import { type Ymd } from 'sefirot/support/Day'
import { requiredYmdIf } from 'sefirot/validation/rules'
import { type RequiredIfCondition } from 'sefirot/validation/validators'
import { ref } from 'vue'

describe('validation/rules/requiredYmdIf', () => {
  function getTestCasesForAllTypes() {
    return [
      { value: { year: 2000, month: 12, date: 31 }, expected: true },
      { value: undefined, expected: false },
      { value: null, expected: false },
      { value: true, expected: false },
      { value: false, expected: false },
      { value: 1, expected: false },
      { value: 'abc', expected: false },
      { value: { year: null, month: null, date: null }, expected: false },
      { value: { year: 2000, month: null, date: 2 }, expected: false },
      { value: {}, expected: false },
      { value: { year: 2000 }, expected: false },
      { value: { year: 2000, month: 12 }, expected: false },
      { value: [], expected: false }
    ]
  }

  function getTestCasesForGivenTypes() {
    return [
      { value: { year: 2000, month: 12, date: null }, expected: true },
      { value: { year: 2000, month: 12 }, expected: true },
      { value: undefined, expected: false },
      { value: null, expected: false },
      { value: true, expected: false },
      { value: false, expected: false },
      { value: 1, expected: false },
      { value: 'abc', expected: false },
      { value: {}, expected: false },
      { value: { year: 2000 }, expected: false },
      { value: { year: 2000, month: undefined }, expected: false },
      { value: { year: 2000, month: null }, expected: false },
      { value: [], expected: false }
    ]
  }

  function addConditions(testCases: ({ value: unknown; expected: boolean })[], bool: boolean) {
    return testCases.reduce((testCases, testCase) => {
      testCases.push({ ...testCase, condition: bool })
      testCases.push({ ...testCase, condition: bool ? 'string' : '' })
      testCases.push({ ...testCase, condition: () => bool })
      testCases.push({ ...testCase, condition: async () => bool })
      return testCases
    }, [] as ({ value: unknown; condition: RequiredIfCondition; expected: boolean })[])
  }

  test.each(
    addConditions(getTestCasesForAllTypes(), true)
  )('validates if the year, month, and date are present: $value is $expected if condition is $condition', async ({ value, condition, expected }) => {
    const rule = requiredYmdIf(condition)
    expect(await rule.$validator(value, null, null)).toBe(expected)
  })

  test.each(
    addConditions(getTestCasesForAllTypes(), false)
  )('validates if the year, month, and date are present: $value is true if condition is $condition', async ({ value, condition }) => {
    const rule = requiredYmdIf(condition)
    expect(await rule.$validator(value, null, null)).toBe(true)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), true)
  )('validates only given types: $value is $expected if condition is $condition', async ({ value, condition, expected }) => {
    const rule = requiredYmdIf(condition, ['y', 'm'])
    expect(await rule.$validator(value, null, null)).toBe(expected)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), false)
  )('validates only given types: $value is true if condition is $condition', async ({ value, condition }) => {
    const rule = requiredYmdIf(condition, ['y', 'm'])
    expect(await rule.$validator(value, null, null)).toBe(true)
  })

  test('condition can be reactive', async () => {
    const condition = ref(false)

    const { data } = useData({
      v: {} as Ymd
    })

    const { validation } = useValidation(data, {
      v: { required: requiredYmdIf(() => condition.value) }
    })

    expect(validation.value.$invalid).toBe(false)

    condition.value = true

    // await since this is async validator.
    await flushPromises()

    expect(validation.value.$invalid).toBe(true)
  })

  test('default error message', () => {
    const rule = requiredYmdIf(true)
    expect(rule.$message({ $params: {} })).toBe('The field is required.')
  })

  it('can set custom error message', () => {
    const rule = requiredYmdIf(true, undefined, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

import { flushPromises } from '@vue/test-utils'
import { useData } from 'sefirot/composables/Data'
import { useValidation } from 'sefirot/composables/Validation'
import { type Hms } from 'sefirot/support/Day'
import { requiredHmsIf } from 'sefirot/validation/rules'
import { type RequiredIfCondition } from 'sefirot/validation/validators'
import { ref } from 'vue'

describe('validation/rules/requiredHmsIf', () => {
  function getTestCasesForAllTypes() {
    return [
      { value: { hour: '01', minute: '02', second: '03' }, expected: true },
      { value: undefined, expected: false },
      { value: null, expected: false },
      { value: true, expected: false },
      { value: false, expected: false },
      { value: 1, expected: false },
      { value: 'abc', expected: false },
      { value: {}, expected: false },
      { value: { hour: '01' }, expected: false },
      { value: { hour: '01', minute: '02' }, expected: false },
      { value: { hour: null, minute: null, second: null }, expected: false },
      { value: { hour: '01', minute: '03', second: null }, expected: false },
      { value: [], expected: false }
    ]
  }

  function getTestCasesForGivenTypes() {
    return [
      { value: { hour: '23', minute: '59', second: '59' }, expected: true },
      { value: { hour: '23', minute: '59', second: '60' }, expected: true },
      { value: { hour: '23', minute: '59' }, expected: true },
      { value: { hour: '23', minute: null }, expected: false },
      { value: undefined, expected: false },
      { value: null, expected: false },
      { value: true, expected: false },
      { value: false, expected: false },
      { value: 1, expected: false },
      { value: 'abc', expected: false },
      { value: {}, expected: false },
      { value: { hour: '23' }, expected: false },
      { value: { hour: '23', minute: undefined }, expected: false },
      { value: { hour: '23', minute: '60', second: '60' }, expected: true },
      { value: { hour: '24', minute: '59', second: '60' }, expected: true },
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
    }, [] as { value: unknown; condition: RequiredIfCondition; expected: boolean }[])
  }

  test.each(
    addConditions(getTestCasesForAllTypes(), true)
  )('validates if the hours, minutes, and seconds are present: $value is $expected if condition is $condition', async ({ value, condition, expected }) => {
    const rule = requiredHmsIf(condition)
    expect(await rule.$validator(value, null, null)).toBe(expected)
  })

  test.each(
    addConditions(getTestCasesForAllTypes(), false)
  )('validates if the hours, minutes, and seconds are present: $value is true if condition is $condition', async ({ value, condition }) => {
    const rule = requiredHmsIf(condition)
    expect(await rule.$validator(value, null, null)).toBe(true)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), true)
  )('validates only given types: $value is $expected if condition is $condition', async ({ value, condition, expected }) => {
    const rule = requiredHmsIf(condition, ['h', 'm'])
    expect(await rule.$validator(value, null, null)).toBe(expected)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), false)
  )('validates only given types: $value is true if condition is $condition', async ({ value, condition }) => {
    const rule = requiredHmsIf(condition, ['h', 'm'])
    expect(await rule.$validator(value, null, null)).toBe(true)
  })

  test('condition can be reactive', async () => {
    const condition = ref(false)

    const { data } = useData({
      v: {} as Hms
    })

    const { validation } = useValidation(data, {
      v: { required: requiredHmsIf(() => condition.value) }
    })

    expect(validation.value.$invalid).toBe(false)

    condition.value = true

    // Await since this is async validator.
    await flushPromises()

    expect(validation.value.$invalid).toBe(true)
  })

  test('default error message', () => {
    const rule = requiredHmsIf(true)
    expect(rule.$message({ $params: {} })).toBe('The field is required.')
  })

  test('it can set custom error message', () => {
    const rule = requiredHmsIf(true, undefined, 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})

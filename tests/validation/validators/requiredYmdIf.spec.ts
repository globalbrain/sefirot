import { type RequiredIfCondition, requiredYmdIf } from 'sefirot/validation/validators'

describe('validation/validators/requiredYmdIf', () => {
  function getTestCasesForAllTypes() {
    return [
      { value: { year: 2000, month: 12, date: 31 }, expected: { required: true, unrequired: true } },
      { value: undefined, expected: { required: false, unrequired: false } },
      { value: null, expected: { required: false, unrequired: false } },
      { value: true, expected: { required: false, unrequired: false } },
      { value: false, expected: { required: false, unrequired: false } },
      { value: 1, expected: { required: false, unrequired: false } },
      { value: 'abc', expected: { required: false, unrequired: false } },
      { value: { year: null, month: null, date: null }, expected: { required: false, unrequired: true } },
      { value: { year: 2000, month: null, date: 2 }, expected: { required: false, unrequired: false } },
      { value: {}, expected: { required: false, unrequired: false } },
      { value: { year: 2000 }, expected: { required: false, unrequired: false } },
      { value: { year: 2000, month: 12 }, expected: { required: false, unrequired: false } },
      { value: [], expected: { required: false, unrequired: false } }
    ]
  }

  function getTestCasesForGivenTypes() {
    return [
      { value: { year: 2000, month: 12, date: null }, expected: { required: true, unrequired: true } },
      { value: { year: 2000, month: 12 }, expected: { required: true, unrequired: true } },
      { value: undefined, expected: { required: false, unrequired: false } },
      { value: null, expected: { required: false, unrequired: false } },
      { value: true, expected: { required: false, unrequired: false } },
      { value: false, expected: { required: false, unrequired: false } },
      { value: 1, expected: { required: false, unrequired: false } },
      { value: 'abc', expected: { required: false, unrequired: false } },
      { value: {}, expected: { required: false, unrequired: false } },
      { value: { year: 2000 }, expected: { required: false, unrequired: false } },
      { value: { year: 2000, month: undefined }, expected: { required: false, unrequired: false } },
      { value: { year: 2000, month: null }, expected: { required: false, unrequired: true } },
      { value: [], expected: { required: false, unrequired: false } }
    ]
  }

  function addConditions(testCases: ({ value: unknown; expected: { required: boolean; unrequired: boolean } })[], bool: boolean) {
    return testCases.reduce((testCases, testCase) => {
      testCases.push({ ...testCase, condition: bool })
      testCases.push({ ...testCase, condition: bool ? 'string' : '' })
      testCases.push({ ...testCase, condition: () => bool })
      testCases.push({ ...testCase, condition: async () => bool })
      return testCases
    }, [] as ({ value: unknown; condition: RequiredIfCondition; expected: { required: boolean; unrequired: boolean } })[])
  }

  test.each(
    addConditions(getTestCasesForAllTypes(), true)
  )('validates if the year, month, and date are present: $value is $expected.required if condition is true', async ({ value, condition, expected }) => {
    expect(await requiredYmdIf(value, condition)).toBe(expected.required)
  })

  test.each(
    addConditions(getTestCasesForAllTypes(), false)
  )('validates if the year, month, and date are present: $value is $expected.unrequired if condition is false', async ({ value, condition, expected }) => {
    expect(await requiredYmdIf(value, condition)).toBe(expected.unrequired)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), true)
  )('validates only given types: $value is $expected.required if condition is true', async ({ value, condition, expected }) => {
    expect(await requiredYmdIf(value, condition, ['y', 'm'])).toBe(expected.required)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), false)
  )('validates only given types: $value is $expected.unrequired if condition is false', async ({ value, condition, expected }) => {
    expect(await requiredYmdIf(value, condition, ['y', 'm'])).toBe(expected.unrequired)
  })
})

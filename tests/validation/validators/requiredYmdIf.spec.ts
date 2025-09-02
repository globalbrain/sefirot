import { type RequiredIfCondition, requiredYmdIf } from 'sefirot/validation/validators'

describe.skip('validation/validators/requiredYmdIf', () => {
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
  )('validates if the year, month, and date are present: $value is $expected if condition is true', async ({ value, condition, expected }) => {
    expect(await requiredYmdIf(value, condition)).toBe(expected)
  })

  test.each(
    addConditions(getTestCasesForAllTypes(), false)
  )('validates if the year, month, and date are present: $value is true if condition is false', async ({ value, condition }) => {
    expect(await requiredYmdIf(value, condition)).toBe(true)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), true)
  )('validates only given types: $value is $expected if condition is true', async ({ value, condition, expected }) => {
    expect(await requiredYmdIf(value, condition, ['y', 'm'])).toBe(expected)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), false)
  )('validates only given types: $value is true if condition is false', async ({ value, condition }) => {
    expect(await requiredYmdIf(value, condition, ['y', 'm'])).toBe(true)
  })
})

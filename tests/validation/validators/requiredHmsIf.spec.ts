import { type RequiredIfCondition, requiredHmsIf } from 'sefirot/validation/validators'

describe('validation/validators/requiredHmsIf', () => {
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
    expect(await requiredHmsIf(value, condition)).toBe(expected)
  })

  test.each(
    addConditions(getTestCasesForAllTypes(), false)
  )('validates if the hours, minutes, and seconds are present: $value is true if condition is $condition', async ({ value, condition }) => {
    expect(await requiredHmsIf(value, condition)).toBe(true)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), true)
  )('validates only given types: $value is $expected if condition is $condition', async ({ value, condition, expected }) => {
    expect(await requiredHmsIf(value, condition, ['h', 'm'])).toBe(expected)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), false)
  )('validates only given types: $value is true if condition is $condition', async ({ value, condition }) => {
    expect(await requiredHmsIf(value, condition, ['h', 'm'])).toBe(true)
  })
})

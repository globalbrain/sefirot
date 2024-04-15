import { type RequiredIfCondition, requiredHmsIf } from 'sefirot/validation/validators'

describe('validation/validators/requiredHmsIf', () => {
  function getTestCasesForAllTypes() {
    return [
      { value: { hour: '01', minute: '02', second: '03' }, expected: { required: true, unrequired: true } },
      { value: undefined, expected: { required: false, unrequired: false } },
      { value: null, expected: { required: false, unrequired: false } },
      { value: true, expected: { required: false, unrequired: false } },
      { value: false, expected: { required: false, unrequired: false } },
      { value: 1, expected: { required: false, unrequired: false } },
      { value: 'abc', expected: { required: false, unrequired: false } },
      { value: {}, expected: { required: false, unrequired: false } },
      { value: { hour: '01' }, expected: { required: false, unrequired: false } },
      { value: { hour: '01', minute: '02' }, expected: { required: false, unrequired: false } },
      { value: { hour: null, minute: null, second: null }, expected: { required: false, unrequired: true } },
      { value: { hour: '01', minute: '03', second: null }, expected: { required: false, unrequired: true } },
      { value: [], expected: { required: false, unrequired: false } }
    ]
  }

  function getTestCasesForGivenTypes() {
    return [
      { value: { hour: '23', minute: '59', second: '59' }, expected: { required: true, unrequired: true } },
      { value: { hour: '23', minute: '59', second: '60' }, expected: { required: true, unrequired: true } },
      { value: { hour: '23', minute: '59' }, expected: { required: true, unrequired: true } },
      { value: { hour: '23', minute: null }, expected: { required: false, unrequired: true } },

      { value: undefined, expected: { required: false, unrequired: false } },
      { value: null, expected: { required: false, unrequired: false } },
      { value: true, expected: { required: false, unrequired: false } },
      { value: false, expected: { required: false, unrequired: false } },
      { value: 1, expected: { required: false, unrequired: false } },
      { value: 'abc', expected: { required: false, unrequired: false } },
      { value: {}, expected: { required: false, unrequired: false } },
      { value: { hour: '23' }, expected: { required: false, unrequired: false } },
      { value: { hour: '23', minute: undefined }, expected: { required: false, unrequired: false } },
      { value: { hour: '23', minute: '60', second: '60' }, expected: { required: true, unrequired: true } },
      { value: { hour: '24', minute: '59', second: '60' }, expected: { required: true, unrequired: true } },
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
    }, [] as { value: unknown; condition: RequiredIfCondition; expected: { required: boolean; unrequired: boolean } }[])
  }

  test.each(
    addConditions(getTestCasesForAllTypes(), true)
  )('validates if the hours, minutes, and seconds are present: $value is $expected.required if condition is $condition', async ({ value, condition, expected }) => {
    expect(await requiredHmsIf(value, condition)).toBe(expected.required)
  })

  test.each(
    addConditions(getTestCasesForAllTypes(), false)
  )('validates if the hours, minutes, and seconds are present: $value is $expected.unrequired if condition is $condition', async ({ value, condition, expected }) => {
    expect(await requiredHmsIf(value, condition)).toBe(expected.unrequired)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), true)
  )('validates only given types: $value is $expected.required if condition is $condition', async ({ value, condition, expected }) => {
    expect(await requiredHmsIf(value, condition, ['h', 'm'])).toBe(expected.required)
  })

  test.each(
    addConditions(getTestCasesForGivenTypes(), false)
  )('validates only given types: $value is $expected.unrequired if condition is $condition', async ({ value, condition, expected }) => {
    expect(await requiredHmsIf(value, condition, ['h', 'm'])).toBe(expected.unrequired)
  })
})

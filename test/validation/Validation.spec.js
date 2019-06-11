import Validation from '@/validation/Validation'

describe('Validation - Validation', () => {
  test('it can `touch` the validation object', () => {
    const v = {
      $touch: jest.fn(() => {})
    }

    Validation.touch(v)

    expect(v.$touch.mock.calls.length).toBe(1)
  })

  test('it does nothing on `touch` if null was passed', () => {
    Validation.touch(null)
  })

  test('it can get name of the filed wichi contains the error', () => {
    const v = {
      $error: true,
      $params: {
        required: { msg: 'Error message for `required`.' },
        email: { msg: 'Error message for `email`.' }
      },
      required: true,
      email: false
    }

    expect(Validation.getError(v)).toBe('email')
  })

  test('it returns null when getting error if there is no error', () => {
    const v = {
      $error: false,
      $params: {
        required: { msg: 'Error message.' }
      },
      required: false
    }

    expect(Validation.getError(v)).toBe(null)
  })

  test('it returns null when getting error if it can not find any field with error', () => {
    const v = {
      $error: true,
      $params: {
        required: { msg: 'Error message.' }
      },
      required: true
    }

    expect(Validation.getError(v)).toBe(null)
  })

  test('it returns null if the given validation object is `null`', () => {
    expect(Validation.getError(null)).toBe(null)
  })

  test('it can retrieve error message if there is any errors', () => {
    const v = {
      $error: true,
      $params: {
        required: { msg: 'Error message.' }
      },
      required: false
    }

    expect(Validation.getErrorMsg(v)).toBe('Error message.')
  })

  test('it returns null when getting error message if there is no error', () => {
    const v = {
      $error: false,
      $params: {
        required: { msg: 'Error message.' }
      },
      required: false
    }

    expect(Validation.getErrorMsg(v)).toBe(null)
  })

  test('it can check if there is any errors', () => {
    const errorV = {
      $error: true,
      $params: {
        required: { msg: 'Error message.' }
      },
      required: false
    }

    expect(Validation.hasError(errorV)).toBe(true)

    const noErrorV = {
      $error: false,
      $params: {
        required: { msg: 'Error message.' }
      },
      required: false
    }

    expect(Validation.hasError(noErrorV)).toBe(false)
  })
})

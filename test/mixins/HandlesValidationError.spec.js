import { mount } from '@vue/test-utils'
import HandlesValidationErrorComponent from './_fixtures/HandlesValidationErrorComponent'

describe('Mixins - HandlesValidationError', () => {
  test('it can catch ValidationError', () => {
    const wrapper = mount(HandlesValidationErrorComponent)

    const spy = jest.spyOn(global.console, 'error').mockImplementation()

    wrapper.find('.validation-error').trigger('click')

    wrapper.find('.generic-error').trigger('click')

    expect(spy).toHaveBeenCalledTimes(2)

    spy.mockRestore()
  })
})

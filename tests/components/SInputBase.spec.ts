import { mount } from '@vue/test-utils'
import SInputBase from 'sefirot/components/SInputBase.vue'
import { createValidatable } from '../Utils'

describe('components/SInputBase', () => {
  test('it shows label and note', () => {
    const wrapper = mount(SInputBase, {
      props: {
        name: 'Input',
        note: 'Some note.',
        label: 'Label for input.'
      }
    })

    expect(wrapper.find('label').text()).toBe('Label for input. Some note.')
  })

  test('it shows error message and help text if validation fails', () => {
    const wrapper = mount(SInputBase, {
      props: {
        name: 'Input',
        help: 'Enter some data.',
        validation: createValidatable({
          $dirty: true,
          $invalid: true,
          $errors: [{
            $message: 'Input cannot be empty.'
          }]
        })
      }
    })

    expect(wrapper.find('.help-error').text()).toBe('Input cannot be empty.')
    expect(wrapper.find('.help-text').text()).toBe('Enter some data.')
  })

  test('it does not show error message when validation fails but do not contain error messages', () => {
    const wrapper = mount(SInputBase, {
      props: {
        name: 'Input',
        help: 'Enter some data.',
        validation: createValidatable({
          $dirty: true,
          $invalid: true,
          $errors: []
        })
      }
    })

    expect(wrapper.find('.help-error').exists()).toBe(false)
  })
})

import { mount } from '@vue/test-utils'
import SInputBase from 'sefirot/components/SInputBase.vue'

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
        validation: {
          $dirty: true,
          $invalid: true,
          $errors: [{
            $message: 'Input cannot be empty.'
          }]
        } as any
      }
    })

    expect(wrapper.find('.help-error').text()).toBe('Input cannot be empty.')
    expect(wrapper.find('.help-text').text()).toBe('Enter some data.')
  })
})

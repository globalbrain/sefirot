import { mount } from '@vue/test-utils'
import SInputBase from '@/components/inputs/SInputBase'

describe('Components - Inputs - SInputBase', () => {
  test('it displays error message if there is any', () => {
    const wrapper = mount(SInputBase, {
      propsData: {
        validation: {
          $error: true,
          $params: {
            required: { msg: 'Error message.' }
          },
          required: false
        }
      }
    })

    expect(wrapper.find('.help-error').exists()).toBe(true)
  })
})

import { mount } from '@vue/test-utils'
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputCheckbox', () => {
  beforeEach(() => {
    createWrapper = options => mount(SInputCheckbox, options)
  })

  it('should emit value on click', () => {
    const wrapper = createWrapper({
      propsData: {
        text: 'Checkbox',
        value: false
      }
    })

    wrapper.find('.SInputCheckbox .input').trigger('click')
    expect(wrapper.emitted('change')).toHaveEmittedWith(true)
  })
})

import { mount } from '@vue/test-utils'
import SInputSwitches from 'sefirot/components/SInputSwitches.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputSwitches', () => {
  beforeEach(() => {
    createWrapper = options => mount(SInputSwitches, options)
  })

  it('should emit value on click', () => {
    const wrapper = createWrapper({
      propsData: {
        options: [
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 }
        ],
        value: [1]
      }
    })

    wrapper.findAll('.SInputSwitches .SInputSwitch-input').at(1).trigger('click')
    expect(wrapper.emitted('change')).toHaveEmittedWith([1, 2])
  })
})

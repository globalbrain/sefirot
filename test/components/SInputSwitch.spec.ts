import { mount } from '@vue/test-utils'
import SInputSwitch from 'sefirot/components/SInputSwitch.vue'
import { CreateWrapperFn } from '../utils'

type Instance = InstanceType<typeof SInputSwitch>
let createWrapper: CreateWrapperFn<Instance>

describe('components/SInputSwitch', () => {
  beforeEach(() => {
    createWrapper = options => mount(SInputSwitch, options)
  })

  it('should emit value on click', () => {
    const wrapper = createWrapper({
      propsData: { value: false }
    })

    wrapper.find('.SInputSwitch .SInputSwitch-input').trigger('click')
    expect(wrapper.emitted('change')).toHaveEmittedWith(true)
  })
})

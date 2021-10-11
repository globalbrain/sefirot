import { mount } from '@vue/test-utils'
import SInputCheckboxes from 'sefirot/components/SInputCheckboxes.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputCheckboxes', () => {
  beforeEach(() => {
    createWrapper = (options = {}) => mount(SInputCheckboxes, {
      ...options,
      propsData: {
        options: [
          { label: 'Checkbox 1', value: 1 },
          { label: 'Checkbox 2', value: 2 },
          { label: 'Checkbox 3', value: 3 }
        ],
        ...options.propsData
      }
    })
  })

  it('should emit value on click', () => {
    const wrapper = createWrapper({
      propsData: {
        value: []
      }
    })

    wrapper.find('.SInputCheckboxes .col:nth-child(1) .input').trigger('click')
    expect(wrapper.emitted('change')).toHaveEmittedWith([1])
  })

  it('should append value on click', () => {
    const wrapper = createWrapper({
      propsData: {
        value: [1]
      }
    })

    wrapper.find('.SInputCheckboxes .col:nth-child(2) .input').trigger('click')
    expect(wrapper.emitted('change')).toHaveEmittedWith([1, 2])
  })

  it('should remove value on click', () => {
    const wrapper = createWrapper({
      propsData: {
        value: [1, 2]
      }
    })

    wrapper.find('.SInputCheckboxes .col:nth-child(2) .input').trigger('click')
    expect(wrapper.emitted('change')).toHaveEmittedWith([1])
  })
})

import { mount } from '@vue/test-utils'
import SInputRadios from 'sefirot/components/SInputRadios.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputRadios', () => {
  beforeEach(() => {
    createWrapper = (options = {}) => mount(SInputRadios, {
      ...options,
      propsData: {
        options: [
          { label: 'Radio 1', value: 1 },
          { label: 'Radio 2', value: 2 },
          { label: 'Radio 3', value: 3 }
        ],
        ...options.propsData
      }
    })
  })

  it('should emit changed value', () => {
    const wrapper = createWrapper({
      propsData: {
        value: 1,
        nullable: false
      }
    })

    wrapper.find('.SInputRadios .col:nth-child(2) .input').trigger('click')
    expect(wrapper.emitted('change')).toHaveEmittedWith(2)
  })

  it('should not emit checked value', () => {
    const wrapper = createWrapper({
      propsData: {
        value: 1,
        nullable: false
      }
    })

    wrapper.find('.SInputRadios .col:nth-child(1) .input').trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('should emit nullable value', () => {
    const wrapper = createWrapper({
      propsData: {
        value: 1,
        nullable: true
      }
    })

    wrapper.find('.SInputRadios .col:nth-child(1) .input').trigger('click')
    expect(wrapper.emitted('change')).toHaveEmittedWith(null)
  })
})

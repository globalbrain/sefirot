import { shallowMount } from '@vue/test-utils'
import SButtonGroup from 'sefirot/components/SButtonGroup.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SButtonGroup', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SButtonGroup, options)
  })

  it('should emit on click', () => {
    const wrapper = createWrapper({
      propsData: {
        items: [
          { label: 'Button A', value: 'button-a' },
          { label: 'Button B', value: 'button-b' },
          { label: 'Button C', value: 'button-c' }
        ]
      }
    })

    wrapper.find('.SButtonGroup .button').trigger('click')

    expect(wrapper.emitted('change')).toBeTruthy()
  })
})

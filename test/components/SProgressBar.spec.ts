import { shallowMount } from '@vue/test-utils'
import SProgressBar from 'sefirot/components/SProgressBar.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SProgressBar', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SProgressBar, options)
  })

  it('should display correct progress', () => {
    const wrapper = createWrapper({
      propsData: {
        now: 50,
        max: 100
      }
    })

    expect(wrapper.find('.SProgressBar .number').text()).toContain('50.00%')
  })
})

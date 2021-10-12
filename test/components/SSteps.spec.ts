import { mount } from '@vue/test-utils'
import SSteps from 'sefirot/components/SSteps.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SSteps', () => {
  beforeEach(() => {
    createWrapper = options => mount(SSteps, options)
  })

  it('should display correct statuses', () => {
    const wrapper = createWrapper({
      propsData: {
        steps: [
          { status: 'done' },
          { status: 'active' },
          { status: 'upcoming' },
          { status: 'failed' }
        ]
      }
    })

    expect(wrapper.find('.SSteps .item:nth-child(1)').classes()).toContain('done')
    expect(wrapper.find('.SSteps .item:nth-child(2)').classes()).toContain('active')
    expect(wrapper.find('.SSteps .item:nth-child(3)').classes()).toContain('upcoming')
    expect(wrapper.find('.SSteps .item:nth-child(4)').classes()).toContain('failed')
  })
})

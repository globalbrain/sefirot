import { mount } from '@vue/test-utils'
import SSteps from 'sefirot/components/SSteps.vue'

describe('components/SSteps', () => {
  it('displays correct statuses', () => {
    const wrapper = mount(SSteps, {
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

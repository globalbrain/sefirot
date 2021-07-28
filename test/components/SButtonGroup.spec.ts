import { shallowMount } from '@vue/test-utils'
import SButtonGroup from 'sefirot/components/SButtonGroup.vue'
import { CreateWrapperFn } from '../utils'

type Instance = InstanceType<typeof SButtonGroup>
let createWrapper: CreateWrapperFn<Instance>

describe('components/SButtonGroup', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SButtonGroup, options)
  })

  it('should emit on click', () => {
    const buttons = [
      { label: 'Button A', value: 'buttonA' },
      { label: 'Button B', value: 'buttonB' },
      { label: 'Button C', value: 'buttonC' }
    ]

    const wrapper = createWrapper({
      propsData: {
        buttons
      }
    })
    wrapper.find('.SButtonGroup .button').trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})

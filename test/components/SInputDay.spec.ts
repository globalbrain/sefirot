import { shallowMount } from '@vue/test-utils'
import SInputDay from 'sefirot/components/SInputDay.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputDay', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SInputDay, options)
  })

  it('should have options according to `year`, `month`, and `nullable` props.', async () => {
    const wrapper = createWrapper({
      propsData: {
        year: 2021,
        month: 1,
        nullable: false
      }
    })
    expect(wrapper.vm.options).toHaveLength(31)

    await wrapper.setProps({
      month: 2
    })
    expect(wrapper.vm.options).toHaveLength(28)

    await wrapper.setProps({
      month: 4
    })
    expect(wrapper.vm.options).toHaveLength(30)

    await wrapper.setProps({
      year: 2020,
      month: 2
    })
    expect(wrapper.vm.options).toHaveLength(29)

    await wrapper.setProps({
      nullable: true
    })
    expect(wrapper.vm.options).toHaveLength(30)
  })
})

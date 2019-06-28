import VueTestUtils, { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import VCalendar from 'v-calendar'
import SInputDate from '@/components/inputs/SInputDate'

VueTestUtils.config.stubs['no-ssr'] = '<span><slot /></span>'

Vue.use(VCalendar, {
  firstDayOfWeek: 1
})

const localVue = createLocalVue()

describe('Components - Inputs - SInputDate', () => {
  test('it emits `input` event when a user inputs the value', () => {
    const wrapper = mount(SInputDate, {
      localVue,
      propsData: { value: null }
    })

    wrapper.vm.emitInput('stub')

    expect(wrapper.emitted('input')[0][0]).toBe('stub')
  })
})

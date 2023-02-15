import { mount } from '@vue/test-utils'
import SButton from 'sefirot/components/SButton.vue'
import SButtonGroup from 'sefirot/components/SButtonGroup.vue'

describe('components/SButtonGroup', () => {
  test('display slotted buttons', () => {
    const wrapper = mount(SButtonGroup, {
      slots: {
        default: [SButton, SButton, SButton]
      }
    })

    const buttons = wrapper.findAll('.SButtonGroup .SButton')

    expect(buttons.length).toBe(3)
  })
})

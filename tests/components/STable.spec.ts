import { mount } from '@vue/test-utils'
import STable from 'sefirot/components/STable.vue'
import { useTable } from 'sefirot/composables/Table'

describe('components/STable', () => {
  test('it displays columns in order', () => {
    const table = useTable({
      orders: ['item_1', 'item_2', 'item_3'],
      columns: {
        item_1: { label: 'item_1' },
        item_2: { label: 'item_2' },
        item_3: { label: 'item_3' }
      }
    })

    const wrapper = mount(STable, {
      props: {
        options: table
      }
    })

    expect(wrapper.find('.STable .head .col-item_1 .label').text()).toBe('item_1')
    expect(wrapper.find('.STable .head .col-item_2 .label').text()).toBe('item_2')
    expect(wrapper.find('.STable .head .col-item_3 .label').text()).toBe('item_3')
  })
})

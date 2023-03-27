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

  test('it displays summary row at bottom', () => {
    const table = useTable({
      orders: ['name', 'amount'],
      columns: {
        name: { label: 'Name' },
        amount: { label: 'Amount' }
      },
      records: [
        { name: 'Item 1', amount: 10 },
        { name: 'Item 2', amount: 90 }
      ],
      summary: {
        name: 'Total', amount: 100
      }
    })

    const wrapper = mount(STable, {
      props: {
        options: table
      }
    })

    expect(wrapper.findAll('.summary .text')[0].text()).toBe('Total')
    expect(wrapper.findAll('.summary .text')[1].text()).toBe('100')
  })
})

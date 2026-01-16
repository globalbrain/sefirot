import { mount } from '@vue/test-utils'
import STable from 'sefirot/components/STable.vue'
import { useTable } from 'sefirot/composables/Table'

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn()
})))

describe('components/STable', () => {
  describe('basics', () => {
    it('displays columns in order', () => {
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

  describe('menu', () => {
    it('displays menu items in the header when `:menu` is set', () => {
      const table = useTable({
        orders: ['name'],
        columns: {
          name: { label: 'Name' }
        },
        menu: [
          {
            label: 'Option A',
            dropdown: [{
              type: 'menu',
              options: [{ label: 'Option A1', onClick: () => {} }]
            }]
          }
        ],
        records: [] as any[]
      })

      const wrapper = mount(STable, {
        props: {
          options: table
        }
      })

      expect(wrapper.find('.STableHeaderMenuItem .label').text()).toBe('Option A')
    })

    it('displays a divider when multiple groups of menus are passed', async () => {
      const table = useTable({
        orders: ['name'],
        columns: {
          name: { label: 'Name' }
        },
        menu: [
          [{
            label: 'Option A',
            dropdown: [{
              type: 'menu',
              options: [{ label: 'Option A1', onClick: () => {} }]
            }]
          }],
          [{
            label: 'Option B',
            dropdown: [{
              type: 'menu',
              options: [{ label: 'Option B1', onClick: () => {} }]
            }]
          }]
        ],
        records: [] as any[]
      })

      const wrapper = mount(STable, {
        props: {
          options: table
        }
      })

      expect(wrapper.find('.STableHeaderMenu .divider').exists()).toBe(true)
    })

    it('displays an indicator icon when the state is `indicate`', () => {
      const table = useTable({
        orders: ['name'],
        columns: {
          name: { label: 'Name' }
        },
        menu: [
          {
            label: 'Option A',
            state: 'indicate',
            dropdown: [{
              type: 'menu',
              options: [{ label: 'Option A1', onClick: () => {} }]
            }]
          }
        ],
        records: [] as any[]
      })

      const wrapper = mount(STable, {
        props: {
          options: table
        }
      })

      expect(wrapper.find('.STableHeaderMenuItem .indicator').exists()).toBe(true)
      expect(wrapper.find('.STableHeaderMenuItem .caret').exists()).toBe(false)
    })

    it('opens dropdown dialog when clicking the menu item', async () => {
      const table = useTable({
        orders: ['name'],
        columns: {
          name: { label: 'Name' }
        },
        menu: [
          {
            label: 'Option A',
            dropdown: [{
              type: 'menu',
              options: [{ label: 'Option A1', onClick: () => {} }]
            }]
          }
        ],
        records: [] as any[]
      })

      const wrapper = mount(STable, {
        props: {
          options: table
        }
      })

      expect(wrapper.find('.STableHeaderMenuItem .dialog').exists()).toBe(false)
      await wrapper.find('.STableHeaderMenuItem .button').trigger('click')
      expect(wrapper.find('.STableHeaderMenuItem .dialog').exists()).toBe(true)
    })
  })

  describe('cell number', () => {
    it('displays `0` value', () => {
      const table = useTable({
        orders: ['num'],
        columns: {
          num: { label: 'Name', cell: { type: 'number' } }
        },
        records: [
          { num: 0 }
        ]
      })

      const wrapper = mount(STable, {
        props: {
          options: table
        }
      })

      expect(wrapper.find('.STableCellNumber .value').text()).toBe('0')
    })
  })

  describe('summary', () => {
    it('displays a summary row at the bottom', () => {
      const table = useTable({
        orders: ['name', 'amount'],
        columns: {
          name: { label: 'Name' },
          amount: { label: 'Amount', cell: { type: 'number' } }
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

      expect(wrapper.find('.summary .col-name').text()).toBe('Total')
      expect(wrapper.find('.summary .col-amount').text()).toBe('100')
    })
  })

  describe('conditional hide', () => {
    it('hides column when `show` is set to `false`', () => {
      const table = useTable({
        orders: ['name', 'amount'],
        columns: {
          name: { label: 'Name' },
          amount: { label: 'Amount', show: false }
        },
        records: [
          { name: 'Item 1', amount: 10 },
          { name: 'Item 2', amount: 90 }
        ]
      })

      const wrapper = mount(STable, {
        props: {
          options: table
        }
      })

      expect(wrapper.find('.STable .head .col-name').exists()).toBe(true)
      expect(wrapper.find('.STable .head .col-amount').exists()).toBe(false)
    })
  })
})

import { flushPromises, mount } from '@vue/test-utils'
import { type IdFieldData, type TextFieldData } from 'sefirot/blocks/lens/FieldData'
import { FieldRegistry } from 'sefirot/blocks/lens/FieldRegistry'
import { type LensResult } from 'sefirot/blocks/lens/LensResult'
import LensTable from 'sefirot/blocks/lens/components/LensTable.vue'
import { FieldRegistryKey } from 'sefirot/blocks/lens/composables/FieldRegistry'
import { type LensEditContext, provideLensEdit } from 'sefirot/blocks/lens/composables/LensEdit'
import { IdField } from 'sefirot/blocks/lens/fields/IdField'
import { TextField } from 'sefirot/blocks/lens/fields/TextField'
import { SefirotLangKey } from 'sefirot/composables/Lang'
import { defineComponent, h } from 'vue'

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn()
})))

describe('blocks/lens/components/LensTable', () => {
  it('renders the table during initial loading and forwards loading updates', async () => {
    const wrapper = mount(LensTable, {
      props: {
        loading: true
      },
      global: {
        provide: {
          [FieldRegistryKey as symbol]: {
            resolve: vi.fn()
          }
        }
      }
    })

    expect(wrapper.find('.STable .loading').exists()).toBe(true)

    await wrapper.setProps({ loading: false })

    expect(wrapper.find('.STable .loading').exists()).toBe(false)
  })

  it('keeps loading visible until async columns finish building', async () => {
    let resolveFilterMenu!: (value: null) => void
    const filterMenu = new Promise<null>((resolve) => {
      resolveFilterMenu = resolve
    })
    const field = {
      tableColumn: vi.fn(() => ({ cell: { type: 'text' } })),
      tableSortMenu: vi.fn(() => null),
      tableFilterMenu: vi.fn(() => filterMenu)
    }
    const result = {
      query: {
        entity: 'users',
        select: ['name'],
        filters: [],
        sort: [],
        page: 1,
        perPage: 100
      },
      fields: {
        name: { key: 'name', type: 'text' }
      },
      data: [{ name: 'Alice' }],
      pagination: { total: 1, page: 1, perPage: 100 }
    } as unknown as LensResult
    const wrapper = mount(LensTable, {
      props: {
        loading: true
      },
      global: {
        provide: {
          [FieldRegistryKey as symbol]: {
            resolve: vi.fn(() => () => field)
          }
        }
      }
    })

    await wrapper.setProps({ loading: false, result })

    expect(wrapper.find('.STable .loading').exists()).toBe(true)

    resolveFilterMenu(null)
    await flushPromises()

    expect(wrapper.find('.STable .loading').exists()).toBe(false)
    expect(wrapper.find('.STableCellText').text()).toBe('Alice')
  })
})

describe('blocks/lens/components/LensTable empty text', () => {
  function makeRegistry(): FieldRegistry {
    const registry = new FieldRegistry()
    registry.register('id', (ctx, field) => new IdField(ctx, field))
    registry.register('text', (ctx, field) => new TextField(ctx, field))
    return registry
  }

  function textField(key: string, overrides: Partial<TextFieldData> = {}): TextFieldData {
    return {
      type: 'text',
      key,
      labelEn: key,
      labelJa: key,
      filterKey: key,
      sortable: false,
      freeze: false,
      width: 0,
      required: false,
      rules: [],
      showOnIndex: true,
      showOnUpdate: true,
      placeholderEn: null,
      placeholderJa: null,
      helpEn: null,
      helpJa: null,
      unitBefore: null,
      unitAfter: null,
      ...overrides
    }
  }

  function makeResult(data: Record<string, any>[], select = ['code', 'name', 'memo']): LensResult {
    return {
      query: {
        entity: 'documents',
        select,
        filters: [],
        sort: [],
        page: 1,
        perPage: 100
      },
      fields: {
        code: textField('code', { emptyTextEn: 'No code', emptyTextJa: 'コードなし' }),
        name: textField('name', { emptyTextEn: 'Untitled', emptyTextJa: '無題' }),
        memo: textField('memo'),
        id: {
          type: 'id',
          key: 'id',
          labelEn: 'ID',
          labelJa: 'ID',
          filterKey: 'id',
          sortable: false,
          freeze: false,
          width: 0,
          required: false,
          rules: [],
          prefix: 'DOC',
          emptyTextEn: 'No number',
          emptyTextJa: '番号なし'
        } satisfies IdFieldData
      },
      data,
      pagination: { total: data.length, page: 1, perPage: 100 }
    } as unknown as LensResult
  }

  function makeEdit(editable: boolean, indexField: string) {
    return {
      editable,
      viewable: true,
      creatable: false,
      canEdit: () => editable,
      canDelete: () => false,
      entity: 'documents',
      indexField,
      resolveId: (record: any) => record[indexField],
      save: vi.fn(),
      saveBlocking: vi.fn(),
      create: vi.fn(),
      remove: vi.fn(),
      openSheet: vi.fn(),
      openCreate: vi.fn(),
      refresh: vi.fn()
    } satisfies LensEditContext
  }

  async function mountTable(
    data: Record<string, any>[],
    {
      editable = false,
      lang = 'en',
      indexField = 'code',
      select
    }: { editable?: boolean; lang?: 'en' | 'ja'; indexField?: string; select?: string[] } = {}
  ) {
    const edit = makeEdit(editable, indexField)
    const Host = defineComponent({
      setup() {
        provideLensEdit(edit)
        return () => h(LensTable, {
          loading: false,
          result: makeResult(data, select),
          inlineEditable: editable
        })
      }
    })
    const wrapper = mount(Host, {
      attachTo: document.body,
      global: {
        provide: {
          [FieldRegistryKey as symbol]: makeRegistry(),
          [SefirotLangKey as symbol]: lang
        }
      }
    })
    await flushPromises()
    return { wrapper, edit }
  }

  function cell(wrapper: any, key: string) {
    return wrapper.find(`.container.body .STableCell.col-${key}`)
  }

  it('renders the empty text muted for blank cells and values as before', async () => {
    const { wrapper } = await mountTable([{ code: 'DOC-1', name: '', memo: null }])

    const name = cell(wrapper, 'name').find('.STableCellText .text')
    expect(name.text()).toBe('Untitled')
    expect(name.classes()).toContain('mute')

    // No empty text in the definition: the blank cell renders nothing, as before.
    expect(cell(wrapper, 'memo').find('.STableCellText .text').exists()).toBe(false)

    // The index cell keeps its value and its sheet-opener color.
    const code = cell(wrapper, 'code').find('.STableCellText .text')
    expect(code.text()).toBe('DOC-1')
    expect(code.classes()).toContain('info')

    wrapper.unmount()
  })

  it('renders values instead of the empty text when the cell has one', async () => {
    const { wrapper } = await mountTable([{ code: 'DOC-1', name: 'Design notes', memo: 'Hi' }])

    const name = cell(wrapper, 'name').find('.STableCellText .text')
    expect(name.text()).toBe('Design notes')
    expect(name.classes()).toContain('neutral')

    wrapper.unmount()
  })

  it('switches the empty text by the current language', async () => {
    const { wrapper } = await mountTable([{ code: 'DOC-1', name: null, memo: null }], { lang: 'ja' })

    expect(cell(wrapper, 'name').find('.STableCellText .text').text()).toBe('無題')

    wrapper.unmount()
  })

  it('keeps a blank index cell muted and still opens the sheet', async () => {
    const record = { code: null, name: 'Draft', memo: null }
    const { wrapper, edit } = await mountTable([record])

    const code = cell(wrapper, 'code').find('.STableCellText .text')
    expect(code.text()).toBe('No code')
    expect(code.classes()).toContain('mute')

    await cell(wrapper, 'code').find('.STableCellText .container').trigger('click')
    expect(edit.openSheet).toHaveBeenCalledWith(record)

    wrapper.unmount()
  })

  it('keeps a blank id display muted, following its path or opening the sheet', async () => {
    const linked = { id: { value: 1, display: null, path: '/documents/1' }, name: 'Draft' }
    const unlinked = { id: { value: 2, display: '', path: null }, name: 'Draft' }
    const { wrapper, edit } = await mountTable([linked, unlinked], {
      indexField: 'id',
      select: ['id', 'name']
    })

    const [first, second] = wrapper.findAll('.container.body .STableCell.col-id')

    // A path still navigates to the record's page, as a displayed id would.
    expect(first.find('.text').text()).toBe('No number')
    expect(first.find('.text').classes()).toContain('mute')
    expect(first.find('a.container').attributes('href')).toBe('/documents/1')

    // Without a path, the index cell still opens the sheet.
    expect(second.find('.text').text()).toBe('No number')
    expect(second.find('.text').classes()).toContain('mute')
    await second.find('.container').trigger('click')
    expect(edit.openSheet).toHaveBeenCalledWith(unlinked)

    wrapper.unmount()
  })

  it('shows the empty text on editable cells but edits the real blank value', async () => {
    const record = { code: 'DOC-1', name: null, memo: null }
    const { wrapper, edit } = await mountTable([record], { editable: true })

    const name = cell(wrapper, 'name').find('.LensTableEditableCell')
    expect(name.find('.value').text()).toBe('Untitled')
    expect(name.find('.value').classes()).toContain('empty')

    // No empty text in the definition: the editable cell stays blank.
    const memo = cell(wrapper, 'memo').find('.LensTableEditableCell')
    expect(memo.find('.value').text()).toBe('')
    expect(memo.find('.value').classes()).not.toContain('empty')

    await name.find('.edit').trigger('click')
    await flushPromises()

    const input = document.querySelector('.LensTableEditableCellEditor input') as HTMLInputElement
    expect(input.value).toBe('')

    // Saving without typing sends the real blank, never the empty text.
    const save = [...document.querySelectorAll('.LensTableEditableCellEditor button')]
      .find((b) => b.textContent?.includes('Save')) as HTMLButtonElement
    save.click()
    await flushPromises()
    expect(edit.save).toHaveBeenCalledWith(record, { name: null })

    wrapper.unmount()
  })
})

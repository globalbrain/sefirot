import { flushPromises, mount } from '@vue/test-utils'
import LensCatalog from 'sefirot/blocks/lens/components/LensCatalog.vue'
import LensSheet from 'sefirot/blocks/lens/components/LensSheet.vue'
import { FieldRegistryKey } from 'sefirot/blocks/lens/composables/FieldRegistry'
import { type LensEditContext, provideLensEdit } from 'sefirot/blocks/lens/composables/LensEdit'
import { Http } from 'sefirot/http/Http'
import { defineComponent, h, nextTick } from 'vue'

describe('blocks/lens/components/LensSheet', () => {
  it('renders record-aware content after the sheet title', () => {
    const record = {
      id: { value: 'DOC-042', display: 'Interface design notes' }
    }
    const edit = {
      editable: false,
      viewable: true,
      creatable: false,
      canEdit: () => false,
      canDelete: () => false,
      entity: 'documents',
      indexField: 'id',
      resolveId: (value) => value.id.value,
      save: vi.fn(),
      saveBlocking: vi.fn(),
      create: vi.fn(),
      remove: vi.fn(),
      openSheet: vi.fn(),
      openCreate: vi.fn(),
      refresh: vi.fn()
    } satisfies LensEditContext

    const Host = defineComponent({
      setup() {
        provideLensEdit(edit)

        return () => h(LensSheet, {
          open: true,
          entity: 'documents',
          record,
          fields: {}
        }, {
          'title-after': ({ title, id, entity, mode, record: slotRecord }: any) => h(
            'span',
            { class: 'title-context' },
            `${title}|${id}|${entity}|${mode}|${slotRecord === record}`
          )
        })
      }
    })

    mount(Host, {
      global: {
        provide: {
          [FieldRegistryKey as symbol]: {
            resolve: vi.fn()
          }
        }
      }
    })

    expect(document.querySelector('.LensSheet .title')?.textContent)
      .toBe('Interface design notes')
    expect(document.querySelector('.LensSheet .title-after .title-context')?.textContent)
      .toBe('Interface design notes|DOC-042|documents|view|true')
  })

  it('forwards the public catalog sheet-title-after slot', async () => {
    vi.spyOn(Http.prototype, 'post').mockResolvedValue({
      query: {
        entity: 'documents',
        select: [],
        filters: [],
        sort: [],
        page: 1,
        perPage: 100
      },
      fields: {},
      data: [{ id: 'DOC-042' }],
      pagination: { total: 1, page: 1, perPage: 100 }
    })

    const wrapper = mount(LensCatalog, {
      props: {
        endpoint: '/api/documents/search',
        entity: 'documents',
        editable: true
      },
      slots: {
        'sheet-title-after': ({ title, entity, mode }: any) => h(
          'span',
          { class: 'catalog-title-context' },
          `${title}|${entity}|${mode}`
        )
      },
      global: {
        provide: {
          [FieldRegistryKey as symbol]: {
            resolve: vi.fn()
          }
        },
        stubs: {
          LensCatalogControl: true,
          LensCatalogFooter: true,
          LensFormFilter: true,
          LensFormView: true,
          LensTable: true,
          SModal: true
        }
      }
    })

    await flushPromises()
    wrapper.vm.openCreate()
    await nextTick()

    expect(document.querySelector('.LensSheet .title-after .catalog-title-context')?.textContent)
      .toBe('New record|documents|create')
  })
})

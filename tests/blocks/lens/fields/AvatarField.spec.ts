import { mount } from '@vue/test-utils'
import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import { type AvatarFieldData } from 'sefirot/blocks/lens/FieldData'
import { AvatarField } from 'sefirot/blocks/lens/fields/AvatarField'
import SAvatar from 'sefirot/components/SAvatar.vue'
import { DataListStateKey } from 'sefirot/composables/DataList'
import { computed } from 'vue'

function ctx(lang: 'en' | 'ja' = 'en'): FieldContext {
  return { lang }
}

function mountDataListItem(field: AvatarField, value: any) {
  return mount(field.dataListItemComponent(), {
    props: { value },
    global: {
      provide: {
        [DataListStateKey]: { labelWidth: computed(() => '100px') }
      }
    }
  })
}

function make(
  overrides: Partial<AvatarFieldData> = {},
  lang: 'en' | 'ja' = 'en'
): AvatarField {
  const data: AvatarFieldData = {
    type: 'avatar',
    key: 'avatar',
    labelEn: 'Avatar',
    labelJa: 'アバター',
    filterKey: 'avatar',
    sortable: false,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    nameEn: null,
    nameJa: null,
    ...overrides
  }
  return new AvatarField(ctx(lang), data)
}

describe('blocks/lens/fields/AvatarField', () => {
  describe('tableCell', () => {
    it('renders an avatar cell with the row value as the image', () => {
      const cell = make().tableCell('https://example.com/a.png', {}) as any
      expect(cell.type).toBe('avatar')
      expect(cell.image).toBe('https://example.com/a.png')
      expect(cell.name).toBe('')
    })

    it('renders an empty avatar cell when the value is null', () => {
      const cell = make().tableCell(null, {}) as any
      expect(cell.type).toBe('avatar')
      expect(cell.image).toBeNull()
      expect(cell.name).toBe('')
    })

    it('renders an empty avatar cell when the value is undefined', () => {
      const cell = make().tableCell(undefined, {}) as any
      expect(cell.type).toBe('avatar')
      expect(cell.image).toBeNull()
      expect(cell.name).toBe('')
    })

    it('reads the English display name from the companion key on the record', () => {
      const cell = make({ nameEn: 'fullNameEn' }).tableCell(
        'https://example.com/a.png',
        { fullNameEn: 'Alice', fullNameJa: 'アリス' }
      ) as any
      expect(cell.image).toBe('https://example.com/a.png')
      expect(cell.name).toBe('Alice')
    })

    it('reads the Japanese display name from the companion key when the language is "ja"', () => {
      const cell = make(
        { nameEn: 'fullNameEn', nameJa: 'fullNameJa' },
        'ja'
      ).tableCell(
        'https://example.com/a.png',
        { fullNameEn: 'Alice', fullNameJa: 'アリス' }
      ) as any
      expect(cell.name).toBe('アリス')
    })

    it('falls back to initials (name with a null image) when the image is missing but a name companion is set', () => {
      const cell = make({ nameEn: 'fullNameEn' }).tableCell(null, { fullNameEn: 'Alice' }) as any
      expect(cell.image).toBeNull()
      expect(cell.name).toBe('Alice')
    })

    it('uses an empty name (not null) when the companion key is missing on the record', () => {
      const cell = make({ nameEn: 'fullNameEn' }).tableCell('https://example.com/a.png', {}) as any
      expect(cell.name).toBe('')
    })

    it('uses an empty name (not null) when no companion key is configured for the active language', () => {
      const cell = make({ nameEn: 'fullNameEn' }, 'ja').tableCell(
        'https://example.com/a.png',
        { fullNameEn: 'Alice' }
      ) as any
      expect(cell.name).toBe('')
    })
  })

  describe('availableFilters', () => {
    it('exposes no filter operators', () => {
      expect(make().availableFilters()).toEqual({})
    })
  })

  describe('tableSortMenu', () => {
    it('is not sortable by default', () => {
      expect(make().tableSortMenu(() => {})).toBeNull()
    })

    it('has no sort menu when sortable but no name companion is configured', () => {
      // The avatar value is the image URL; with no name companion there is
      // nothing meaningful to sort on.
      expect(make({ sortable: true }).tableSortMenu(() => {})).toBeNull()
    })

    it('sorts by the name companion (active language) when sortable', () => {
      const captured: any[] = []
      const menu = make({ sortable: true, nameEn: 'name_en', nameJa: 'name_ja' })
        .tableSortMenu((s) => captured.push(s)) as any

      expect(menu).not.toBeNull()
      menu.options[0].onClick()
      menu.options[1].onClick()
      expect(captured).toEqual([['name_en', 'asc'], ['name_en', 'desc']])
    })

    it('sorts by the Japanese companion when the language is "ja"', () => {
      const captured: any[] = []
      const menu = make({ sortable: true, nameEn: 'name_en', nameJa: 'name_ja' }, 'ja')
        .tableSortMenu((s) => captured.push(s)) as any

      menu.options[0].onClick()
      expect(captured).toEqual([['name_ja', 'asc']])
    })
  })

  describe('dataListItemComponent', () => {
    it('returns a component without throwing', () => {
      expect(() => make().dataListItemComponent()).not.toThrow()
    })

    it('renders the avatar when an image is present', () => {
      const wrapper = mountDataListItem(make(), 'https://example.com/a.png')
      expect(wrapper.findComponent(SAvatar).exists()).toBe(true)
      wrapper.unmount()
    })

    it('renders the empty placeholder (not an empty avatar) when the value is null', () => {
      const wrapper = mountDataListItem(make(), null)
      expect(wrapper.findComponent(SAvatar).exists()).toBe(false)
      expect(wrapper.find('.empty').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  describe('formInputComponent', () => {
    it('returns an avatar input component without throwing', () => {
      expect(() => make().formInputComponent()).not.toThrow()
      expect(make().formInputComponent()).toBeTruthy()
    })
  })

  describe('write behavior', () => {
    it('is submittable — its File rides the lens create/update payload', () => {
      expect(make().isSubmittable()).toBe(true)
    })

    it('does not support the generic optimistic cell/field editors', () => {
      expect(make().supportsOptimisticUpdate()).toBe(false)
    })

    it('uses null as the empty input value', () => {
      expect(make().inputEmptyValue()).toBeNull()
    })
  })

  describe('config', () => {
    it('defaults accept to image/* and imageType to circle', () => {
      expect(make().accept()).toBe('image/*')
      expect(make().imageType()).toBe('circle')
    })

    it('honors a configured accept and imageType', () => {
      const field = make({ accept: 'image/png', imageType: 'rectangle' })
      expect(field.accept()).toBe('image/png')
      expect(field.imageType()).toBe('rectangle')
    })

    it('exposes the configured display-name companion keys', () => {
      const field = make({ nameEn: 'name_en', nameJa: 'name_ja' })
      expect(field.nameKeys()).toEqual({ en: 'name_en', ja: 'name_ja' })
      expect(field.nameKey()).toBe('name_en')
    })

    it('resolves the Japanese name key when the language is "ja"', () => {
      const field = make({ nameEn: 'name_en', nameJa: 'name_ja' }, 'ja')
      expect(field.nameKey()).toBe('name_ja')
    })
  })
})

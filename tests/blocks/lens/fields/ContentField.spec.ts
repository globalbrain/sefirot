import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import { type ContentFieldData, type TextFieldData } from 'sefirot/blocks/lens/FieldData'
import { ContentField } from 'sefirot/blocks/lens/fields/ContentField'
import { TextField } from 'sefirot/blocks/lens/fields/TextField'

function ctx(lang: 'en' | 'ja' = 'en'): FieldContext {
  return { lang }
}

function make(overrides: Partial<ContentFieldData> = {}): ContentField {
  const data: ContentFieldData = {
    type: 'content',
    key: 'instructions',
    labelEn: 'Instructions',
    labelJa: '説明',
    filterKey: 'instructions',
    sortable: false,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    bodyEn: 'Hello',
    bodyJa: 'こんにちは',
    ...overrides
  }
  return new ContentField(ctx(), data)
}

describe('blocks/lens/fields/ContentField', () => {
  it('is display-only — not submittable', () => {
    expect(make().isSubmittable()).toBe(false)
  })

  it('still resolves a (display-only) form input component without throwing', () => {
    expect(make().formInputComponent()).toBeTruthy()
  })

  it('renders an empty table cell', () => {
    expect(make().tableCell(null, {})).toEqual({ type: 'empty' })
  })

  it('provides a detail component (renders its body, not an empty row)', () => {
    // Regression: it previously returned null, so a detail-visible content
    // field rendered as an empty value row instead of its Markdown body.
    expect(make().dataListItemComponent()).toBeTruthy()
  })

  it('contrasts with a regular field, which is submittable by default', () => {
    const data: TextFieldData = {
      type: 'text',
      key: 'name',
      labelEn: 'Name',
      labelJa: '名前',
      filterKey: 'name',
      sortable: false,
      freeze: false,
      width: 0,
      required: false,
      rules: [],
      placeholderEn: null,
      placeholderJa: null,
      helpEn: null,
      helpJa: null,
      unitBefore: null,
      unitAfter: null
    }
    expect(new TextField(ctx(), data).isSubmittable()).toBe(true)
  })
})

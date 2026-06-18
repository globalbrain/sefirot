import { defineComponent, h } from 'vue'
import SContent from '../../../components/SContent.vue'
import SMarkdown from '../../../components/SMarkdown.vue'
import { type TableCell } from '../../../composables/Table'
import { type ContentFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { Field } from './Field'

export class ContentField extends Field<ContentFieldData> {
  // `content` is a display-only field: `formInputComponent()` renders static
  // Markdown (instructions) rather than an editable input, so it must never be
  // seeded / validated / submitted as a value, nor made inline-editable.
  override isSubmittable(): boolean {
    return false
  }

  override tableCell(_v: any, _r: any): TableCell {
    return { type: 'empty' }
  }

  override availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    return {}
  }

  override dataListItemComponent(): any {
    // `content` is display-only: render its Markdown body (the same static
    // block as the create form) so a detail-visible content field shows its
    // configured instructions instead of an empty value row.
    return defineComponent(() => () => this.renderBody(), { props: ['value'] })
  }

  override formInputComponent(): any {
    return this.defineFormInputComponent((_props, _ctx) => () => this.renderBody())
  }

  /** Render the field's localized Markdown body. */
  private renderBody(): any {
    return h(SMarkdown, {
      content: this.ctx.lang === 'ja' ? this.data.bodyJa : this.data.bodyEn
    }, {
      default: (slot: any) => h(SContent, { innerHTML: slot.rendered })
    })
  }
}

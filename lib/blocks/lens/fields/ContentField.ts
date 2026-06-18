import { h } from 'vue'
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
    return null
  }

  override formInputComponent(): any {
    return this.defineFormInputComponent((_props, _ctx) => {
      return () => h(SMarkdown, {
        content: this.ctx.lang === 'ja' ? this.data.bodyJa : this.data.bodyEn
      }, {
        default: (slot: any) => {
          return h(SContent, { innerHTML: slot.rendered })
        }
      })
    })
  }
}

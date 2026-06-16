import { h } from 'vue'
import SAvatar from '../../../components/SAvatar.vue'
import { type TableCell } from '../../../composables/Table'
import { type AvatarFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { Field } from './Field'

export class AvatarField extends Field<AvatarFieldData> {
  override tableCell(v: any, r: any): TableCell {
    // The display name lives on a sibling key of the record (resolved by the
    // active language), not on the field value, which is the image URL.
    const nameKey = this.ctx.lang === 'ja' ? this.data.nameJa : this.data.nameEn
    return {
      type: 'avatar',
      // The field value is the image URL itself. A missing value renders an
      // empty cell (both `image` and `name` falsy), unless a name companion
      // is configured, in which case the avatar falls back to its initials.
      image: v ?? null,
      // Empty string (not null) when unset: a null name makes the cell
      // renderer fall back to the raw row value, which here is the image URL
      // and would break SAvatar.
      name: nameKey ? (r?.[nameKey] ?? '') : ''
    }
  }

  override availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    return {}
  }

  override dataListItemComponent(): any {
    return this.defineDataListItemComponent((value) => {
      return h(SAvatar, { size: 'small', avatar: value ?? null })
    })
  }

  override formInputComponent(): any {
    throw new Error('Not implemented.')
  }
}

import { h } from 'vue'
import SAvatar from '../../../components/SAvatar.vue'
import { type TableCell } from '../../../composables/Table'
import { type AvatarFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import LensAvatarInput from '../components/LensAvatarInput.vue'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { Field } from './Field'

export class AvatarField extends Field<AvatarFieldData> {
  override tableCell(v: any, r: any): TableCell {
    // The display name lives on a sibling key of the record (resolved by the
    // active language), not on the field value, which is the image URL.
    const nameKey = this.nameKey()
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
      // Render nothing for a missing image so SDataListItem shows its empty
      // placeholder ("—"), matching the empty table cell and the other
      // data-list fields, instead of an empty bordered avatar.
      return value ? h(SAvatar, { size: 'small', avatar: value }) : null
    })
  }

  // The avatar value is a raw `File` on edit (or null on removal), submitted
  // through the Lens create/update write as a multipart part — so it stays
  // submittable (the base default). On read it's the image URL, a different
  // shape that can't be shown optimistically: the write must complete before the
  // row can reflect the new URL. So editing routes through the dedicated avatar
  // cell / sheet field (a blocking save), never the generic optimistic cell/field
  // editors, which would patch the row with a raw `File` and crash the URL renderer.
  override supportsOptimisticUpdate(): boolean {
    return false
  }

  override inputEmptyValue(): any {
    return null
  }

  override formInputComponent(): any {
    return this.defineFormInputComponent((props, { emit }) => {
      return () => h(LensAvatarInput, {
        'label': this.formInputLabel(),
        'help': this.help() || undefined,
        'accept': this.accept(),
        'imageType': this.imageType(),
        'modelValue': props.modelValue,
        'validation': props.validation,
        'onUpdate:modelValue': (value: any) => {
          emit('update:modelValue', value)
        }
      })
    })
  }

  /** The `accept` attribute for the file picker. */
  accept(): string {
    return this.data.accept || 'image/*'
  }

  /** The picker preview shape. */
  imageType(): 'circle' | 'rectangle' {
    return this.data.imageType || 'circle'
  }

  /** The companion name key resolved against the active language, if any. */
  nameKey(): string | null {
    return (this.ctx.lang === 'ja' ? this.data.nameJa : this.data.nameEn) ?? null
  }

  /** The configured English / Japanese display-name keys. */
  nameKeys(): { en: string | null; ja: string | null } {
    return { en: this.data.nameEn ?? null, ja: this.data.nameJa ?? null }
  }
}

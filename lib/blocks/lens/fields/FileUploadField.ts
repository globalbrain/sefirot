import { h } from 'vue'
import SDescFile from '../../../components/SDescFile.vue'
import SInputFileUpload from '../../../components/SInputFileUpload.vue'
import { type TableCell } from '../../../composables/Table'
import { type FileUploadFieldData } from '../FieldData'
import { type FileDownloader } from '../FileDownloader'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { Field } from './Field'

export class FileUploadField extends Field<FileUploadFieldData> {
  downloader: FileDownloader

  constructor(ctx: any, fieldData: FileUploadFieldData, downloader: FileDownloader) {
    super(ctx, fieldData)
    this.downloader = downloader
  }

  // The form input holds raw `File` objects until they're uploaded, which only
  // happens server-side; an optimistic patch would store those `File`s on the
  // row and crash the persisted-path renderer. So file uploads aren't editable
  // inline / in the sheet (only on create, which is blocking).
  override supportsOptimisticUpdate(): boolean {
    return false
  }

  override tableCell(v: any, _r: any): TableCell {
    return {
      type: 'text',
      value: v
    }
  }

  override availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    return {}
  }

  override dataListItemComponent(): any {
    return this.defineDataListItemComponent((value) => {
      if (value === null) {
        return null
      }
      return h(SDescFile, {
        item: value.map((filePath: any) => ({
          name: filePath.split('/').pop(),
          onDownload: () => this.downloader(filePath)
        }))
      })
    })
  }

  override inputEmptyValue(): any {
    return []
  }

  override formInputComponent(): any {
    return this.defineFormInputComponent((props, { emit }) => {
      return () => h(SInputFileUpload, {
        'size': 'mini',
        'label': this.formInputLabel(),
        'placeholder': this.placeholder() || undefined,
        'help': this.help() || undefined,
        'modelValue': props.modelValue,
        'validation': props.validation,
        'onUpdate:modelValue': (value: any) => {
          emit('update:modelValue', value)
        }
      })
    })
  }
}

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

  tableCell(v: any, _r: any): TableCell {
    return {
      type: 'text',
      value: v
    }
  }

  availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    return {}
  }

  dataListItemComponent(): any {
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

  inputEmptyValue(): any {
    return []
  }

  formInputComponent(): any {
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

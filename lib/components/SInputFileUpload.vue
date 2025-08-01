<script setup lang="ts" generic="T extends ModelType = 'file'">
import { type ValidationRuleWithParams } from '@vuelidate/core'
import { useDropZone } from '@vueuse/core'
import { type Component, computed, ref } from 'vue'
import { useTrans } from '../composables/Lang'
import { type Validatable } from '../composables/Validation'
import { formatSize } from '../support/File'
import SButton, { type Mode as ButtonMode } from './SButton.vue'
import SCard from './SCard.vue'
import SCardBlock from './SCardBlock.vue'
import { type State as IndicatorState } from './SIndicator.vue'
import SInputBase, { type Color } from './SInputBase.vue'
import SInputFileUploadItem from './SInputFileUploadItem.vue'
import STrans from './STrans.vue'

export type Size = 'mini' | 'small' | 'medium'
export type { Color }

export type ModelType = 'file' | 'object'
export type ModelValue<T extends ModelType> = T extends 'file' ? File : FileObject

export interface FileObject {
  file: File
  indicatorState?: IndicatorState | null
  canRemove?: boolean
  action?: Action
  errorMessage?: string | null
}

export interface Action {
  mode?: ButtonMode
  icon?: Component
  leadIcon?: Component
  trailIcon?: Component
  label?: string
  onClick(): void
}

const props = withDefaults(defineProps<{
  size?: Size
  label?: string
  info?: string
  note?: string
  help?: string
  text?: string
  placeholder?: string
  emptyText?: string
  accept?: string
  multiple?: boolean
  checkIcon?: Component
  checkText?: string
  checkColor?: Color
  droppable?: boolean
  value?: ModelValue<T>[]
  modelType?: T
  modelValue?: ModelValue<T>[]
  rules?: Record<string, ValidationRuleWithParams>
  validation?: Validatable
  hideError?: boolean
}>(), {
  modelType: 'file' as any // `ModelType` doesn't work so stubbing it.
})

const emit = defineEmits<{
  'update:model-value': [files: ModelValue<T>[]]
  'change': [files: ModelValue<T>[]]
}>()

const { t } = useTrans({
  en: {
    button_text: 'Choose File',
    empty_text: 'No file selected',
    selected_files: (c: number) => c === 1 ? `${c} file` : `${c} files`
  },
  ja: {
    button_text: 'ファイルを選択',
    empty_text: 'ファイルが選択されていません',
    selected_files: (c: number) => `ファイル数: ${c}`
  }
})

const dropZoneEl = ref<HTMLDivElement | null>(null)

const { isOverDropZone } = useDropZone(dropZoneEl, {
  multiple: true,
  onDrop: (files) => onDrop(files)
})

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : [] as ModelValue<T>[]
})

const input = ref<HTMLInputElement | null>(null)

const classes = computed(() => [
  props.size ?? 'small',
  { droppable: props.droppable },
  { 'is-over-drop-zone': isOverDropZone.value }
])

const totalFileCountText = computed(() => {
  return t.selected_files(_value.value.length)
})

const totalFileSizeText = computed(() => {
  const files = _value.value.map((file) => file instanceof File ? file : file.file)
  return formatSize(files)
})

function open() {
  input.value!.click()
}

function onDrop(files: File[] | null) {
  if (files !== null && files.length > 0) {
    emitChange(append(files))
  }
}

function onChange(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])

  // When files are empty, that means user have "canceled" the file selection
  // so we should do nothing in this case.
  if (files.length === 0) {
    return
  }

  emitChange(append(files))
}

function onRemove(index: number) {
  const files = _value.value.filter((_, i) => i !== index)
  emitChange(files)
}

function emitChange(files: ModelValue<T>[]) {
  emit('update:model-value', files)
  emit('change', files)
  props.validation?.$touch()
}

function append(files: File[]) {
  return [
    ..._value.value,
    ...(props.modelType === 'file' ? files : toFileObjects(files))
  ] as ModelValue<T>[]
}

function toFileObjects(files: File[]) {
  return files.map((file) => ({ file } as ModelValue<T>))
}
</script>

<template>
  <SInputBase
    class="SInputFileUpload"
    :class="classes"
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :validation
    :hide-error
  >
    <template #default="{ hasError }">
      <input
        ref="input"
        class="input"
        type="file"
        :accept
        multiple
        @change="onChange"
      >
      <SCard :mode="hasError ? 'danger' : undefined">
        <SCardBlock v-if="droppable" class="drop-zone" ref="dropZoneEl" @click="open">
          <div class="drop-zone-box">
            <STrans lang="en">
              <div class="drop-zone-text">
                Drag and drop files here, or
              </div>
              <div class="drop-zone-action">
                <SButton size="mini" label="Select files" />
              </div>
            </STrans>
            <STrans lang="ja">
              <div class="drop-zone-text">
                ファイルをドラック＆ドロップ、または
              </div>
              <div class="drop-zone-action">
                <SButton size="mini" label="ファイルを選択" />
              </div>
            </STrans>
          </div>
        </SCardBlock>
        <SCardBlock v-if="!droppable || placeholder" class="header">
          <SButton
            v-if="!droppable"
            size="small"
            :label="text ?? t.button_text"
            @click="open"
          />
          <p v-if="placeholder" class="placeholder">
            {{ placeholder }}
          </p>
        </SCardBlock>
        <template v-if="_value.length">
          <SInputFileUploadItem
            v-for="file, i in _value"
            :key="i"
            :file
            :rules
            @remove="() => { onRemove(i) }"
          />
        </template>
        <template v-else>
          <SCardBlock class="empty">
            <p class="empty-text">
              {{ emptyText ?? t.empty_text }}
            </p>
          </SCardBlock>
        </template>
        <SCardBlock class="footer">
          <div class="footer-left">
            <p class="footer-file-count">
              {{ totalFileCountText }}
            </p>
          </div>
          <div class="footer-right">
            <p class="footer-file-size">
              {{ totalFileSizeText }}
            </p>
            <div class="footer-spacer" />
          </div>
        </SCardBlock>
      </SCard>
    </template>
    <template v-if="$slots.info" #info>
      <slot name="info" />
    </template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.input {
  display: none;
}

.drop-zone {
  padding: 12px;

  &:hover .drop-zone-box {
    border-color: var(--c-border-info-1);
    cursor: pointer;
  }
}

.drop-zone-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border: 1px dashed var(--c-border-mute-1);
  border-radius: 3px;
  padding: 24px 0;
  min-height: 192px;
  text-align: center;
  transition: border-color 0.25s;
}

.drop-zone-text {
  text-align: center;
  font-size: 14px;
  color: var(--c-text-2);
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 0 8px;
}

.placeholder {
  line-height: 24px;
  font-size: 12px;
  color: var(--c-text-2);
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 0 16px;
}

.empty-text {
  line-height: 20px;
  font-size: 12px;
  color: var(--c-text-2);
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0 8px 0 16px;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-file-count,
.footer-file-size {
  line-height: 24px;
  font-size: 12px;
  color: var(--c-text-2);
}

.footer-spacer {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
}

.SInputFileUpload.droppable {
  .header {
    padding-left: 16px;
  }
}

.SInputFileUpload.is-over-drop-zone {
  .drop-zone-box {
    border-color: var(--c-border-info-1);
  }
}
</style>

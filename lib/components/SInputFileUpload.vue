<script setup lang="ts">
import { type Component, computed, ref } from 'vue'
import { useTrans } from '../composables/Lang'
import { type Validatable } from '../composables/Validation'
import { formatSize } from '../support/File'
import SButton from './SButton.vue'
import SCard from './SCard.vue'
import SCardBlock from './SCardBlock.vue'
import SInputBase from './SInputBase.vue'
import SInputFileUploadItem from './SInputFileUploadItem.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
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
  value?: File[]
  modelValue?: File[]
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  'update:model-value': [files: File[]]
  'change': [files: File[]]
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

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : []
})

const input = ref<HTMLInputElement | null>(null)

const classes = computed(() => [props.size ?? 'small'])

const totalFileCountText = computed(() => {
  return t.selected_files(_value.value.length)
})

const totalFileSizeText = computed(() => {
  return formatSize(_value.value)
})

function open() {
  input.value!.click()
}

function onChange(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])

  // When files are empty, that means user have "canceled" the file selection
  // so we should do nothing in this case.
  if (files.length === 0) {
    return
  }

  const newFiles = [..._value.value, ...files]

  emit('update:model-value', newFiles)
  emit('change', newFiles)

  props.validation?.$touch()
}

function onRemove(index: number) {
  const files = _value.value.filter((_, i) => i !== index)

  emit('update:model-value', files)
  emit('change', files)
}
</script>

<template>
  <SInputBase
    class="SInputFile"
    :class="classes"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :validation="validation"
    :hide-error="hideError"
  >
    <template #default="{ hasError }">
      <input
        ref="input"
        class="input"
        type="file"
        :accept="accept"
        multiple
        @change="onChange"
      >
      <SCard :mode="hasError ? 'danger' : undefined">
        <SCardBlock class="header">
          <SButton
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
            :key="file.name"
            :file="file"
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
</style>

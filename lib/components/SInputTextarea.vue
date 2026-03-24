<script setup lang="ts">
import { computed, ref } from 'vue'
import SDivider from './SDivider.vue'
import SInputBase, { type Props as BaseProps } from './SInputBase.vue'
import SInputSegments from './SInputSegments.vue'

export type { Color, Size } from './SInputBase.vue'

export interface Props extends BaseProps {
  placeholder?: string
  disabled?: boolean
  tabindex?: 0 | -1 | number
  rows?: number | 'fill'
  autoResize?: boolean | number
  value?: string | null
  modelValue?: string | null
  preview?: (value: string | null) => string
  previewLabel?: string
  writeLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  rows: 3
})

const emit = defineEmits<{
  'update:model-value': [value: string | null]
  'input': [value: string | null]
  'blur': [value: string | null]
}>()

const sizePaddingYDict = {
  sm: 6,
  md: 10,
  mini: 6,
  small: 10,
  medium: 22
}

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined
      ? props.value
      : null
})

const classes = computed(() => [
  props.size,
  { disabled: props.disabled },
  { fill: props.rows === 'fill' }
])

const style = computed(() => {
  if (!props.autoResize) {
    return undefined
  }

  const rows = props.rows === 'fill' ? 3 : props.rows
  const padding = sizePaddingYDict[props.size]
  const fontSize = 24

  const minHeight = `min-height: ${rows * fontSize + padding}px;`
  const maxHeight = props.autoResize === true
    ? ''
    : `max-height: calc(${props.autoResize}lh + ${padding}px);`

  return `field-sizing:content;${minHeight}${maxHeight}`
})

const isPreview = ref(false)

function emitInput(e: Event): void {
  const v = (e.target as HTMLInputElement).value || null
  emit('update:model-value', v)
  emit('input', v)
}

function emitBlur(e: FocusEvent): void {
  props.validation?.$touch()

  const v = (e.target as HTMLInputElement).value || null
  emit('update:model-value', v)
  emit('blur', v)
}
</script>

<template>
  <SInputBase
    class="SInputTextarea"
    :class="classes"
    :size
    :name
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :validation
    :warning
    :hide-error
    :hide-warning
  >
    <div class="box">
      <div v-if="preview !== undefined || $slots.actions" class="control">
        <div class="preview">
          <SInputSegments
            v-if="preview !== undefined"
            v-model="isPreview"
            :options="[
              { label: writeLabel ?? 'Write', value: false },
              { label: previewLabel ?? 'Preview', value: true }
            ]"
            size="mini"
          />
        </div>
        <div v-if="$slots.actions && !isPreview" class="actions">
          <slot name="actions" />
        </div>
      </div>
      <SDivider v-if="preview !== undefined || $slots.actions" />
      <textarea
        v-show="!isPreview"
        :id="name"
        class="input"
        :style
        :placeholder
        :rows="rows === 'fill' ? 3 : rows"
        :disabled
        :tabindex
        :value="_value ?? undefined"
        @input="emitInput"
        @blur="emitBlur"
      />
      <div
        v-if="preview !== undefined && isPreview"
        class="prose"
        :class="!_value && 'empty'"
        v-html="preview(_value)"
      />
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.SInputTextarea.sm,
.SInputTextarea.mini {
  .input,
  .prose {
    padding: 3px 8px;
    width: 100%;
    min-height: 30px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }
}

.SInputTextarea.md {
  .input,
  .prose {
    padding: 5px 10px;
    width: 100%;
    min-height: 34px;
    line-height: 24px;
    font-size: var(--input-font-size, 14px);
  }
}

.SInputTextarea.small {
  .input,
  .prose {
    padding: 7px 12px;
    width: 100%;
    min-height: 38px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }
}

.SInputTextarea.medium {
  .input,
  .prose {
    padding: 11px 16px;
    width: 100%;
    min-height: 46px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }
}

.SInputTextarea.fill {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.SInputTextarea.disabled,
.SInputTextarea.disabled:hover {
  .box {
    border-color: var(--input-disabled-border-color);
  }

  .input {
    color: var(--input-disabled-value-color);
    background-color: var(--input-disabled-bg-color);
    cursor: not-allowed;
  }
}

.SInputTextarea.has-error .box {
  border-color: var(--input-error-border-color);
}

.SInputTextarea.has-warning .box {
  border-color: var(--input-warning-border-color);
}

.box {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 1px solid var(--input-border-color);
  border-radius: 8px;
  width: 100%;
  box-shadow: var(--input-box-shadow);
  background-color: var(--input-bg-color);
  overflow: hidden;
  transition: border-color 0.25s;

  &:has(.input:hover) {
    border-color: var(--input-hover-border-color);
  }

  &:has(.input:focus) {
    border-color: var(--input-focus-border-color);
  }
}

.control {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 8px;
  height: 48px;
  background-color: var(--c-bg-1);
}

.preview {
  flex-grow: 1;
}

.actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.input,
.prose {
  display: block;
  flex-grow: 1;
  width: 100%;
  font-family: var(--input-value-font-family);
  font-weight: 400;
  background-color: transparent;
}

.input::placeholder {
  color: var(--input-placeholder-color);
}

.prose.empty {
  color: var(--input-placeholder-color);
}
</style>

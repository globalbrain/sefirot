<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import { computed, ref } from 'vue'
import { type Validatable } from '../composables/V'
import SInputBase from './SInputBase.vue'
import SInputSegments from './SInputSegments.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: IconifyIcon
  checkText?: string
  checkColor?: Color
  placeholder?: string
  disabled?: boolean
  rows?: number | 'fill'
  value?: string | null
  modelValue?: string | null
  hideError?: boolean
  validation?: Validatable
  preview?: (value: string | null) => string
  previewLabel?: string
  writeLabel?: string
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: string | null): void
  (e: 'input', value: string | null): void
  (e: 'blur', value: string | null): void
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled },
  { fill: props.rows === 'fill' }
])

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

const isPreview = ref(false)
</script>

<template>
  <SInputBase
    class="SInputTextarea"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :hide-error="hideError"
    :validation="validation"
  >
    <div class="box">
      <div v-if="preview !== undefined" class="control">
        <SInputSegments
          :options="[
            { label: writeLabel ?? 'Write', value: false },
            { label: previewLabel ?? 'Preview', value: true }
          ]"
          v-model="isPreview"
          size="mini"
        />
      </div>
      <textarea
        v-show="!isPreview"
        :id="name"
        class="input"
        :placeholder="placeholder"
        :rows="rows ?? 3"
        :disabled="disabled"
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
.box {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex-grow: 1;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  width: 100%;
  background-color: var(--c-gutter);
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
  padding: 0 8px;
  height: 48px;
  background-color: var(--c-bg-elv-3);
}

.input,
.prose {
  display: block;
  flex-grow: 1;
  width: 100%;
  font-family: var(--input-value-font-family);
  font-weight: 400;
  background-color: var(--input-bg-color);
}

.input {
  &::placeholder {
    color: var(--input-placeholder-color);
  }
}

.prose {
  background-color: var(--c-bg-elv-3);

  &.empty {
    color: var(--input-placeholder-color);
  }
}

.SInputTextarea.mini {
  .input,
  .prose {
    padding: 6px 10px;
    width: 100%;
    min-height: 80px;
    line-height: 20px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }
}

.SInputTextarea.small {
  .input,
  .prose {
    padding: 7px 12px;
    width: 100%;
    min-height: 96px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }
}

.SInputTextarea.medium {
  .input,
  .prose {
    padding: 11px 16px;
    width: 100%;
    min-height: 96px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }
}

.SInputTextarea.fill {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;

  .input,
  .prose {
    height: 100%;
  }
}

.SInputTextarea.disabled {
  .box {
    border-color: var(--input-disabled-border-color);
  }

  .input {
    color: var(--input-disabled-value-color);
    background-color: var(--input-disabled-bg-color);
    cursor: not-allowed;
  }
}

.SInputTextarea.has-error {
  .box {
    border-color: var(--input-error-border-color);
  }
}
</style>

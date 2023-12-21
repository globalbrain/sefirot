<script setup lang="ts" generic="T extends string | number | boolean">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import { computed } from 'vue'
import { type Validatable } from '../composables/V'
import SInputBase from './SInputBase.vue'
import SInputSegmentsOption, { type Mode } from './SInputSegmentsOption.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'default' | 'mute' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'
export type CheckColor = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

export interface Option<T extends string | number | boolean> {
  label: string
  value: T
  mode?: Mode
  disabled?: boolean
}

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: IconifyIcon
  checkText?: string
  checkColor?: CheckColor
  options: Option<T>[]
  block?: boolean
  disabled?: boolean
  value?: T
  modelValue?: T
  validation?: Validatable
  hideError?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: T): void
  (e: 'change', value: T): void
}>()

const _value = computed(() => {
  const v = props.modelValue !== undefined
    ? props.modelValue
    : props.value

  if (v === undefined) {
    throw new Error('[sefirot] SInputSegments: `value` or `modelValue` is required.')
  }

  return v
})

function onSelect(value: T) {
  emit('update:model-value', value)
  emit('change', value)
}
</script>

<template>
  <SInputBase
    class="SInputSegments"
    :class="[size ?? 'small', { block }]"
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
      <SInputSegmentsOption
        v-for="option, index in options"
        :key="index"
        :size="size ?? 'small'"
        :label="option.label"
        :value="option.value"
        :mode="option.mode ?? 'default'"
        :active="_value === option.value"
        :disabled="disabled ? true : option.disabled ?? false"
        @click="onSelect(option.value)"
      />
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.SInputSegments.mini {
  .box {
    padding: 2px;
    height: 32px;
  }
}

.SInputSegments.small {
  .box {
    padding: 4px;
    height: 40px;
  }
}

.SInputSegments.medium {
  .box {
    padding: 4px;
    height: 48px;
  }
}

.SInputSegments.block {
  .box {
    display: flex;
  }
}

.SInputSegments.has-error {
  .box {
    border-color: var(--input-error-border-color);
  }
}

.box {
  display: inline-flex;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s;
}
</style>

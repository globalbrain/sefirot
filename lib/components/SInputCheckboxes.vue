<script setup lang="ts">
import { IconifyIcon } from '@iconify/vue/dist/offline'
import { DefineComponent, PropType } from 'vue'
import SInputBase from './SInputBase.vue'
import SInputCheckbox from './SInputCheckbox.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

interface CheckboxOption {
  label: string
  value: any
}

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  name: { type: String, default: null },
  label: { type: String, default: null },
  info: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  checkIcon: { type: Object as PropType<IconifyIcon | DefineComponent>, default: null },
  checkText: { type: String, default: null },
  checkColor: { type: String as PropType<Color>, default: null },
  options: { type: Array as PropType<CheckboxOption[]>, required: true },
  modelValue: { type: Array, required: true }
})

const emit = defineEmits(['update:modelValue'])

function isChecked(value: unknown): boolean {
  return props.modelValue.includes(value)
}

function handleChange(value: unknown): void {
  const distinct = props.modelValue
    .filter((v) => v !== value)
    .concat(props.modelValue.includes(value) ? [] : [value])

  emit('update:modelValue', distinct)
}
</script>

<template>
  <SInputBase
    class="SInputCheckboxes"
    :class="[size]"
    :name="name"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
  >
    <div class="container">
      <div class="row">
        <div v-for="option in options" :key="option.value" class="col">
          <SInputCheckbox
            :text="option.label"
            :model-value="isChecked(option.value)"
            @update:model-value="handleChange(option.value)"
          />
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.container {
  display: flex;
}

.row {
  margin: -2px -8px;
}

.col {
  padding: 2px 8px;
}
</style>

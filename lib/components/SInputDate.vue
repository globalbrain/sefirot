<script setup lang="ts">
import { type MaskaDetail } from 'maska'
import { vMaska } from 'maska/vue'
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import { type Day, day } from '../support/Day'
import SInputText, { type Color, type Size } from './SInputText.vue'

export type { Color, Size }

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: Component
  checkText?: string
  checkColor?: Color
  block?: boolean
  disabled?: boolean
  tabindex?: -1 | 0 | number
  modelValue: Day | null
  validation?: Validatable
  hideError?: boolean
}>()

const emit = defineEmits<{
  'update:model-value': [value: Day | null]
}>()

const classes = computed(() => [
  props.block && 'block'
])

const value = computed(() => {
  return props.modelValue ? day(props.modelValue).format('YYYY-MM-DD') : null
})

function onMaska(detail: MaskaDetail): void {
  if (!detail.unmasked) {
    emit('update:model-value', null)
  } else if (detail.completed) {
    emit('update:model-value', day(detail.masked))
  }
}
</script>

<template>
  <SInputText
    v-maska="{ mask: '####-##-##', eager: true, onMaska }"
    class="SInputDate"
    :class="classes"
    :size
    :name
    :label
    :note
    :info
    :help
    placeholder="YYYY-MM-DD"
    :check-icon
    :check-text
    :check-color
    :disabled
    :tabindex
    :model-value="value"
    :validation
    :hide-error
  >
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputText>
</template>

<style lang="postcss" scoped>
.SInputDate.sm :deep(.box),
.SInputDate.mini :deep(.box) {
  max-width: 114px;
}

.SInputDate.md :deep(.box) {
  max-width: 120px;
}

.SInputDate.small :deep(.box),
.SInputDate.medium :deep(.box) {
  max-width: 136px;
}

.SInputDate.block :deep(.box) {
  max-width: 100%;
}
</style>

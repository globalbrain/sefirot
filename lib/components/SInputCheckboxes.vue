<script setup lang="ts" generic="T = any">
import { computed } from 'vue'
import SInputBase, { type Props as BaseProps } from './SInputBase.vue'
import SInputCheckbox from './SInputCheckbox.vue'

export interface Option<T = any> {
  label: string
  value: T
  disabled?: boolean
}

export interface Props<T = any> extends BaseProps {
  options: Option<T>[]
  nullable?: boolean
  disabled?: boolean
  value?: T[]
  modelValue?: T[]
}

const props = withDefaults(defineProps<Props<T>>(), {
  nullable: true
})

const emit = defineEmits<{
  'update:model-value': [value: T[]]
  'change': [value: T[]]
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined
      ? props.value
      : []
})

function isChecked(value: T): boolean {
  return _value.value.includes(value)
}

function onChange(value: T): void {
  const distinct = _value.value
    .filter((v) => v !== value)
    .concat(_value.value.includes(value) ? [] : [value])

  if (distinct.length === 0 && !props.nullable) {
    return
  }

  emit('update:model-value', distinct)
  emit('change', distinct)
}
</script>

<template>
  <SInputBase
    class="SInputCheckboxes"
    :class="[size ?? 'small']"
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
    <div class="container">
      <div class="row">
        <div v-for="option in options" :key="String(option.value)" class="col">
          <SInputCheckbox
            size="sm"
            :text="option.label"
            :disabled="option.disabled ?? disabled"
            :model-value="isChecked(option.value)"
            @update:model-value="onChange(option.value)"
          />
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

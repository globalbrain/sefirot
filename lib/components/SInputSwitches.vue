<script setup lang="ts" generic="T = any">
import { computed } from 'vue'
import { type Option } from '../support/InputOption'
import SInputBase, { type Props as BaseProps } from './SInputBase.vue'
import SInputSwitch from './SInputSwitch.vue'

export interface Props<T = any> extends BaseProps {
  options: Option<T>[]
  disabled?: boolean
  modelValue: T[]
}

const props = defineProps<Props<T>>()

const emit = defineEmits<{
  'update:model-value': [value: T[]]
}>()

const classes = computed(() => [
  props.size ?? 'small'
])

function isChecked(value: T): boolean {
  return props.modelValue.includes(value)
}

function onChange(value: T): void {
  const difference = props.modelValue
    .filter((v) => v !== value)
    .concat(props.modelValue.includes(value) ? [] : [value])

  emit('update:model-value', difference)
}
</script>

<template>
  <SInputBase
    class="SInputSwitches"
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
    <div class="container">
      <div class="row">
        <div v-for="(option, i) in options" :key="i" class="col">
          <SInputSwitch
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

<style lang="postcss" scoped>
.container {
  display: flex;
}

.row {
  width: 100%;
}
</style>

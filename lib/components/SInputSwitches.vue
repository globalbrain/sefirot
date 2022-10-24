<script setup lang="ts">
import { PropType, computed } from 'vue'
import SInputBase from './SInputBase.vue'
import SInputSwitch from './SInputSwitch.vue'

type Size = 'mini' | 'small'
type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

interface Option {
  label: string
  value: any
}

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  mode: { type: String as PropType<Mode>, default: 'neutral' },
  name: { type: String, default: null },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  options: { type: Array as PropType<Option[]>, required: true },
  modelValue: { type: Array as PropType<unknown[]>, required: true }
})

const emit = defineEmits(['update:modelValue'])

const classes = computed(() => [
  props.size,
  props.mode
])

function isChecked(value: unknown): boolean {
  return props.modelValue.includes(value)
}

function handleChange(value: unknown): void {
  const difference = props.modelValue
    .filter(v => v !== value)
    .concat(props.modelValue.includes(value) ? [] : [value])
  emit('update:modelValue', difference)
}
</script>

<template>
  <SInputBase
    class="SInputSwitches"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
  >
    <div class="SInputSwitches-container">
      <div class="SInputSwitches-row">
        <div v-for="option in options" :key="option.value" class="SInputSwitches-col">
          <SInputSwitch
            :size="size"
            :mode="mode"
            :text="option.label"
            :model-value="isChecked(option.value)"
            @update:model-value="handleChange(option.value)"
          />
        </div>
      </div>
    </div>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputSwitches.mini {
  .SInputSwitches-row { margin: -2px -8px; }
  .SInputSwitches-col { padding: 2px 8px; }
}

.SInputSwitches.small {
  .SInputSwitches-row { margin: -4px -8px; }
  .SInputSwitches-col { padding: 4px 8px; }
}

.SInputSwitches-container {
  display: flex;
}

.SInputSwitches-row {
  width: 100%;
}
</style>

<template>
  <SInputBase
    class="SInputRadios"
    :class="[size]"
    :label="label"
    :note="note"
    :help="help"
    :error-message="errorMessage"
    :validation="validation"
  >
    <div class="container">
      <div class="row">
        <div v-for="(option, index) in options" :key="index" class="col">
          <SInputRadio
            :text="option.label"
            :model-value="isChecked(option.value)"
            @update:model-value="handleChange(option.value)"
          />
        </div>
      </div>
    </div>
  </SInputBase>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'
import SInputRadio from './SInputRadio.vue'

type Size = 'mini' | 'small' | 'medium'

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  name: { type: String, default: null },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  nullable: { type: Boolean, default: true },
  options: { type: Array as PropType<any[]>, required: true },
  errorMessage: { type: Boolean, default: true },
  modelValue: { type: [String, Number, Boolean], default: null },
  validation: { type: Object as PropType<Validatable>, default: null }
})

const emit = defineEmits(['update:modelValue'])

function isChecked(value: string | number | boolean) {
  return value === props.modelValue
}

function handleChange(value: string | number | boolean) {
  if (value !== props.modelValue) {
    emit('update:modelValue', value)

    return
  }

  if (props.nullable) {
    emit('update:modelValue', null)
  }
}
</script>

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

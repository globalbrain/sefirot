<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import { computed } from 'vue'
import { Validatable } from '../composables/Validation'
import { Day, day } from '../support/Day'
import SInputBase from './SInputBase.vue'

const props = defineProps<{
  name?: string
  label?: string
  note?: string
  info?: string
  help?: string
  hideError?: boolean
  modelValue: Day | null
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Day | null): void
}>()

const value = computed(() => {
  return props.modelValue
    ? props.modelValue.format('YYYY-MM-DD')
    : null
})

function emitInput(date?: string) {
  emit('update:modelValue', date ? day(date) : null)
}

function emitBlur() {
  setTimeout(() => {
    props.validation && props.validation.$touch()
  }, 100)
}
</script>

<template>
  <SInputBase
    class="SInputDate small"
    :name="name"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :hide-error="hideError"
    :validation="validation"
  >
    <div class="container">
      <DatePicker
        v-slot="{ inputValue, inputEvents }"
        color="blue"
        is-dark
        :masks="{ input: 'YYYY-MM-DD' }"
        :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }"
        :popover="{ placement: 'bottom', visibility: 'click' }"
        :model-value="value"
        @update:model-value="emitInput"
      >
        <input
          :id="name"
          class="input"
          type="text"
          placeholder="YYYY-MM-DD"
          :value="inputValue"
          autocomplete="off"
          v-on="inputEvents"
          @blur="emitBlur"
        >
      </DatePicker>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputDate.has-error {
  .input {
    border-color: var(--c-danger);

    &:focus {
      border-color: var(--c-danger);
    }
  }
}

.input {
  display: block;
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  padding: 5px 12px;
  width: 100%;
  max-width: 144px;
  height: 40px;
  letter-spacing: 0;
  line-height: 24px;
  font-size: 16px;
  background-color: var(--c-bg);
  transition: border-color 0.25s, background-color 0.25s;

  &::placeholder {
    font-weight: 500;
    color: var(--c-text-3);
  }
}
</style>

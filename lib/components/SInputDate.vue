<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import { type Day, day } from '../support/Day'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

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
  modelValue: Day | null
  validation?: Validatable
  hideError?: boolean
}>()

const emit = defineEmits<{
  'update:model-value': [value: Day | null]
}>()

const classes = computed(() => [
  props.size ?? 'small'
])

const value = computed(() => {
  return props.modelValue
    ? props.modelValue.format('YYYY-MM-DD')
    : null
})

function emitInput(date?: string) {
  emit('update:model-value', date ? day(date) : null)
}

function emitBlur() {
  setTimeout(() => {
    props.validation && props.validation.$touch()
  }, 100)
}
</script>

<template>
  <SInputBase
    class="SInputDate"
    :class="classes"
    :name
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :hide-error
    :validation
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
          :class="{ block, disabled }"
          type="text"
          placeholder="YYYY-MM-DD"
          autocomplete="off"
          :value="inputValue"
          :disabled
          v-on="disabled ? {} : inputEvents"
          @blur="emitBlur"
        >
      </DatePicker>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputDate.mini {
  .input {
    padding: 3px 8px;
    max-width: 114px;
    height: 32px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .input.block {
    max-width: 100%;
  }
}

.SInputDate.small {
  .input {
    padding: 5px 12px;
    max-width: 136px;
    height: 40px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }

  .input.block {
    max-width: 100%;
  }
}

.SInputDate.medium {
  .input {
    padding: 11px 12px;
    max-width: 136px;
    height: 48px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }

  .input.block {
    max-width: 100%;
  }
}

.SInputDate.has-error {
  .input {
    border-color: var(--input-error-border-color);

    &:focus {
      border-color: var(--input-error-border-color);
    }
  }
}

.input {
  display: block;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  width: 100%;
  font-weight: 400;
  font-feature-settings: 'tnum';
  background-color: var(--input-bg-color);
  transition: border-color 0.25s, background-color 0.25s;

  &::placeholder {
    color: var(--input-placeholder-color);
  }

  &:hover {
    border-color: var(--input-hover-border-color);
  }

  &:focus {
    border-color: var(--input-focus-border-color);
  }

  &.disabled {
    border-color: var(--input-disabled-border-color);
    background-color: var(--input-disabled-bg-color);
    cursor: not-allowed;
  }
}
</style>

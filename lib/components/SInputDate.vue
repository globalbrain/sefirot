<script setup lang="ts">
import { type MaskInputOptions } from 'maska'
import { vMaska } from 'maska/vue'
import { type Component, computed, reactive, ref, watch } from 'vue'
import { type Validatable } from '../composables/Validation'
import { type Day, day } from '../support/Day'
import { type SDate, now } from '../support/Now'
import SDatePicker from './SDatePicker.vue'
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
  validation?: Validatable
  hideError?: boolean
}>()

const modelValue = defineModel<Day | null>({ required: true })

const inputValue = ref('')
const dateValue = reactive({ ...now })

watch(inputValue, () => {
  const [year, month, day] = inputValue.value.split('-')
  if (year && year.length === 4) {
    const yearValue = Number.parseInt(year)
    if (dateValue.year !== yearValue && yearValue >= 1900 && yearValue <= 2099) {
      dateValue.year = yearValue
    }
  }
  if (month && month.length === 2) {
    const monthValue = Number.parseInt(month)
    if (dateValue.month !== monthValue && monthValue >= 1 && monthValue <= 12) {
      dateValue.month = monthValue
    }
  }
  if (day && day.length === 2) {
    const dayValue = Number.parseInt(day)
    const daysInMonth = new Date(dateValue.year, dateValue.month, 0).getDate()
    if (dateValue.day !== dayValue && dayValue >= 1 && dayValue <= daysInMonth) {
      dateValue.day = dayValue
    }
  }
})

const maskOptions: MaskInputOptions = {
  mask: '####-##-##',
  eager: true
}

const classes = computed(() => [props.size ?? 'small'])

function onSelected(date: SDate) {
  inputValue.value = [date.year, date.month, date.day]
    .map((value) => value.toString().padStart(2, '0')).join('-')
}

function onBlur() {
  setTimeout(() => {
    props.validation && props.validation.$touch()
  }, 100)
}
</script>

<template>
  <SInputBase
    class="SInputDate"
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
    <div class="container">
      <input
        :id="name"
        :class="{ block, disabled }"
        :disabled="disabled"
        @blur="onBlur"
        autocomplete="off"
        class="input"
        inputmode="numeric"
        placeholder="YYYY-MM-DD"
        type="text"
        v-maska="maskOptions"
        v-model="inputValue"
      >
      <SDatePicker :selected="dateValue" @selected="onSelected" />
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

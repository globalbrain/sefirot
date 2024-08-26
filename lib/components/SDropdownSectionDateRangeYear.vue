<script setup lang="ts">
import { useValidation } from '../composables/Validation'
import { Year } from '../support/DateRange'
import { maxValue, minValue, required } from '../validation/rules'
import SInputNumber from './SInputNumber.vue'

const props = defineProps<{
  preset: Year
}>()

const emit = defineEmits<{
  (e: 'change', value: Year): void
}>()

const { validation } = useValidation(() => ({
  year: props.preset.year
}), {
  year: {
    required: required(),
    minValue: minValue(1),
    maxValue: maxValue(9999)
  }
})

function onInput(value: number | null) {
  emit('change', new Year().setYear(value))
}
</script>

<template>
  <div class="SDropdownSectionDateRangeYear">
    <div class="group">
      <div class="label">Year</div>
      <div class="input">
        <SInputNumber
          size="mini"
          placeholder="YYYY"
          block
          :model-value="preset.year"
          :validation="validation.year"
          hide-error
          @input="onInput"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDropdownSectionDateRangeYear {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}

.group {
  display: flex;
  align-items: center;
  padding: 0 8px 0 16px;
}

.label {
  flex-shrink: 0;
  width: 64px;
  font-size: 12px;
  color: var(--c-text-2);
}

.input {
  flex-grow: 1;
}
</style>

<script setup lang="ts">
import { useValidation } from '../composables/Validation'
import { YearHalf } from '../support/DateRange'
import { maxValue, minValue, required } from '../validation/rules'
import SInputNumber from './SInputNumber.vue'
import SInputSelect from './SInputSelect.vue'

const props = defineProps<{
  preset: YearHalf
}>()

const emit = defineEmits<{
  change: [value: YearHalf]
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

const halfOptions = [
  { label: 'H1', value: 1 },
  { label: 'H2', value: 2 }
]

function onYearInput(value: number | null) {
  emit('change', new YearHalf().setYear(value).setHalf(props.preset.half))
}

function onHalfChange(value: any) {
  emit('change', new YearHalf().setYear(props.preset.year).setHalf(value))
}
</script>

<template>
  <div class="SDropdownSectionDateRangeYearHalf">
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
          @input="onYearInput"
        />
      </div>
    </div>
    <div class="group">
      <div class="label">Half</div>
      <div class="input">
        <SInputSelect
          size="mini"
          :options="halfOptions"
          :model-value="preset.half"
          @change="onHalfChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDropdownSectionDateRangeYearHalf {
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

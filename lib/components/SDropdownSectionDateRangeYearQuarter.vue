<script setup lang="ts">
import { useValidation } from '../composables/Validation'
import { YearQuarter } from '../support/DateRange'
import { maxValue, minValue, required } from '../validation/rules'
import SInputNumber from './SInputNumber.vue'
import SInputSelect from './SInputSelect.vue'

const props = defineProps<{
  preset: YearQuarter
}>()

const emit = defineEmits<{
  change: [value: YearQuarter]
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

const quarterOptions = [
  { label: 'Q1', value: 1 },
  { label: 'Q2', value: 2 },
  { label: 'Q3', value: 3 },
  { label: 'Q4', value: 4 }
]

function onYearInput(value: number | null) {
  emit('change', new YearQuarter().setYear(value).setQuarter(props.preset.quarter))
}

function onQuarterChange(value: any) {
  emit('change', new YearQuarter().setYear(props.preset.year).setQuarter(value))
}
</script>

<template>
  <div class="SDropdownSectionDateRangeYearQuarter">
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
      <div class="label">Quarter</div>
      <div class="input">
        <SInputSelect
          size="mini"
          :options="quarterOptions"
          :model-value="preset.quarter"
          @change="onQuarterChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDropdownSectionDateRangeYearQuarter {
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

<script setup lang="ts">
import { useValidation } from '../composables/Validation'
import { DateFromTo } from '../support/DateRange'
import { type Day } from '../support/Day'
import { required } from '../validation/rules'
import SInputDate from './SInputDate.vue'

const props = defineProps<{
  preset: DateFromTo
}>()

const emit = defineEmits<{
  change: [value: DateFromTo]
}>()

const { validation } = useValidation(() => ({
  from: props.preset.from,
  to: props.preset.to
}), {
  from: { required: required() },
  to: { required: required() }
})

function onFromChange(value: Day | null) {
  emit('change', new DateFromTo().setFrom(value).setTo(props.preset.to))
}

function onToChange(value: Day | null) {
  emit('change', new DateFromTo().setFrom(props.preset.from).setTo(value))
}
</script>

<template>
  <div class="SDropdownSectionDateRangeDateFromTo">
    <div class="group">
      <div class="label">From</div>
      <div class="input">
        <SInputDate
          size="mini"
          block
          :model-value="preset.from"
          :validation="validation.from"
          hide-error
          @change="onFromChange"
        />
      </div>
    </div>
    <div class="group">
      <div class="label">To</div>
      <div class="input">
        <SInputDate
          size="mini"
          block
          :model-value="preset.to"
          :validation="validation.to"
          hide-error
          @change="onToChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDropdownSectionDateRangeDateFromTo {
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

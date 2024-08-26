<script setup lang="ts">
import { type MaybeRefOrGetter, computed, shallowRef, toValue } from 'vue'
import { type DropdownSectionActionsOption } from '../composables/Dropdown'
import { useTrans } from '../composables/Lang'
import { useValidation } from '../composables/Validation'
import { DateRange, type DateRangePreset, type DateRangePresetType } from '../support/DateRange'
import SDropdownSectionActions from './SDropdownSectionActions.vue'
import SDropdownSectionDateRangeDateFromTo from './SDropdownSectionDateRangeDateFromTo.vue'
import SDropdownSectionDateRangeYear from './SDropdownSectionDateRangeYear.vue'
import SDropdownSectionDateRangeYearHalf from './SDropdownSectionDateRangeYearHalf.vue'
import SDropdownSectionDateRangeYearQuarter from './SDropdownSectionDateRangeYearQuarter.vue'
import SInputSelect from './SInputSelect.vue'

const props = defineProps<{
  range: MaybeRefOrGetter<DateRange>
  onApply: (range: DateRange) => void
}>()

const { t } = useTrans({
  en: {
    p_date_from_to: 'Custom period',
    p_year: 'Year',
    p_year_half: 'Year half',
    p_year_quarter: 'Year quarter',
    a_apply: 'Apply'
  },
  ja: {
    p_date_from_to: '日付指定',
    p_year: '年',
    p_year_half: '半期',
    p_year_quarter: '四半期',
    a_apply: '適用する'
  }
})

const _range = shallowRef(toValue(props.range))

const presetValue = computed(() => {
  return _range.value.preset.type
})

const presetOptions = [
  { label: t.p_date_from_to, value: 'date-from-to' },
  { label: t.p_year, value: 'year' },
  { label: t.p_year_half, value: 'year-half' },
  { label: t.p_year_quarter, value: 'year-quarter' }
]

const actions: DropdownSectionActionsOption[] = [
  { label: t.a_apply, mode: 'info', onClick: onApply }
]

const { validate } = useValidation()

function onPresetChange(value: any) {
  _range.value = new DateRange().setPreset(value as DateRangePresetType)
}

function onValueChange(value: DateRangePreset) {
  _range.value = new DateRange().setPreset(value)
}

async function onApply() {
  if (await validate()) {
    props.onApply(_range.value)
  }
}
</script>

<template>
  <div class="SDropdownSectionDateRange">
    <div class="preset">
      <SInputSelect
        size="mini"
        :options="presetOptions"
        :value="presetValue"
        @change="onPresetChange"
      />
    </div>
    <div class="control">
      <SDropdownSectionDateRangeDateFromTo
        v-if="_range.preset.type === 'date-from-to'"
        :preset="_range.preset"
        @change="onValueChange"
      />
      <SDropdownSectionDateRangeYear
        v-else-if="_range.preset.type === 'year'"
        :preset="_range.preset"
        @change="onValueChange"
      />
      <SDropdownSectionDateRangeYearHalf
        v-else-if="_range.preset.type === 'year-half'"
        :preset="_range.preset"
        @change="onValueChange"
      />
      <SDropdownSectionDateRangeYearQuarter
        v-else-if="_range.preset.type === 'year-quarter'"
        :preset="_range.preset"
        @change="onValueChange"
      />
    </div>
    <div class="actions">
      <SDropdownSectionActions
        :options="actions"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDropdownSectionDateRange {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background-color: var(--c-bg-elv-1);
}

.preset {
  padding: 8px;
  background-color: var(--c-bg-elv-3);
}

.control {
  background-color: var(--c-bg-elv-3);
}
</style>

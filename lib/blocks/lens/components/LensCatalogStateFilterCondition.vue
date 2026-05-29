<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import { computed } from 'vue'
import { type FieldData } from '../FieldData'
import { type FilterOperator, FilterOperatorLabelDict } from '../FilterOperator'
import { useFieldFactory } from '../composables/FieldFactory'

export interface Props {
  fields: Record<string, FieldData>
  condition: FilterCondition
}

export interface FilterCondition {
  field: string
  operator: FilterOperator
  value: any
}

const props = defineProps<Props>()

const fieldFactory = useFieldFactory()

const field = computed(() => {
  const fieldData = props.fields[props.condition.field]
  // A still-applied filter can reference a field that's no longer in the
  // field set (e.g. a stale saved filter). Keep the chip rendering rather
  // than crashing on `make(undefined)`, so the active filter stays
  // visible and counted instead of silently filtering the table.
  return fieldData ? fieldFactory.make(fieldData) : null
})

const input = computed(() => {
  return field.value?.filterInputByOperator(props.condition.operator) ?? null
})

const fieldText = computed(() => {
  // Fall back to the raw field key when the field has no definition.
  return field.value ? field.value.label() : props.condition.field
})

const operatorText = computed(() => {
  return FilterOperatorLabelDict[props.condition.operator]
})

const valueText = computedAsync(async () => {
  if (!input.value) {
    return String(props.condition.value ?? '')
  }
  return input.value.valueToText(props.condition.value)
}, '...')
</script>

<template>
  <div class="LensCatalogStateFilterCondition">
    <div class="field">{{ fieldText }}</div>
    <div class="operator">{{ operatorText }}</div>
    <div class="value">
      {{ valueText }}
    </div>
  </div>
</template>

<style scoped>
.LensCatalogStateFilterCondition {
  display: flex;
  gap: 1px;
  border: 1px dashed var(--c-divider);
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--c-gutter);
}

.field,
.operator,
.value {
  padding: 0 8px;
  line-height: 22px;
  font-size: 12px;
  background-color: var(--c-bg-1);
}

.operator {
  color: var(--c-text-2);
}

.value {
  max-width: 192px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

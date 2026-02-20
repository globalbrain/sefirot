<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import { computed } from 'vue'
import { type FieldData } from '../FieldData'
import { type FilterOperator, FilterOperatorTextDict } from '../FilterOperator'
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
  return fieldFactory.make(props.fields[props.condition.field])
})

const input = computed(() => {
  return field.value.filterInputByOperator(props.condition.operator)
})

const fieldText = computed(() => {
  return field.value.label()
})

const operatorText = computed(() => {
  return FilterOperatorTextDict[props.condition.operator]
})

const valueText = computedAsync(async () => {
  return input.value.valueToText(props.condition.value)
}, '...')
</script>

<template>
  <div class="LensCatalogStateFilterCondition">
    <div class="field">{{ fieldText }}</div>
    <div class="operator">{{ operatorText }}</div>
    <div v-if="input === null" class="value">
      ...
    </div>
    <div v-else class="value">
      {{ valueText }}
    </div>
  </div>
</template>

<style scoped lang="postcss">
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

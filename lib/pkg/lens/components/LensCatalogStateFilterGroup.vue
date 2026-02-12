<script setup lang="ts">
import { type FieldData } from '../FieldData'
import LensCatalogStateFilterCondition, { type FilterCondition } from './LensCatalogStateFilterCondition.vue'

export interface Props {
  fields: Record<string, FieldData>
  isRoot: boolean
  group: FilterGroup
}

export interface FilterGroup {
  connector: '$and' | '$or'
  conditions: FilterCondition[]
  groups: FilterGroup[]
}

defineProps<Props>()

const connectorTextDict = {
  $and: 'AND',
  $or: 'OR'
}
</script>

<template>
  <div class="LensCatalogStateFilterGroup" :class="{ 'is-root': isRoot }">
    <div v-if="!isRoot" class="connector">
      <div class="connector-text">{{ connectorTextDict[group.connector] }}</div>
    </div>
    <div class="body">
      <div v-if="group.conditions.length" class="conditions">
        <LensCatalogStateFilterCondition
          v-for="condition, index in group.conditions"
          :key="index"
          :fields
          :condition
        />
      </div>
      <div v-if="group.groups.length" class="groups">
        <LensCatalogStateFilterGroup
          v-for="g, i in group.groups"
          :key="i"
          :fields
          :is-root="false"
          :group="g"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.LensCatalogStateFilterGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px dashed var(--c-divider);
  border-radius: 6px;
  padding: 8px;

  &.is-root {
    border: 0;
    padding: 0;
  }
}

.connector {
  display: flex;
}

.connector-text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 1px dashed var(--c-divider);
  border-radius: 6px;
  padding: 0 8px;
  height: 24px;
  font-size: 12px;
  color: var(--c-text-2);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.conditions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.groups {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

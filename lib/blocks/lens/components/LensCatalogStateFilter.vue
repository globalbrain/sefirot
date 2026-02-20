<script setup lang="ts">
import IconArrowsInLineVertical from '~icons/ph/arrows-in-line-vertical'
import IconArrowsOutLineVertical from '~icons/ph/arrows-out-line-vertical'
import IconX from '~icons/ph/x'
import { computed, ref } from 'vue'
import { useTrans } from '../../../composables/Lang'
import { type FieldData } from '../FieldData'
import LensCatalogStateFilterGroup, { type FilterGroup } from './LensCatalogStateFilterGroup.vue'

export interface Props {
  fields: Record<string, FieldData>
  filters: any[]
}

interface Count {
  value: number
}

const props = defineProps<Props>()

defineEmits<{
  reset: []
}>()

const { t } = useTrans({
  en: {
    filter_count: (count: number) => `${count} filter${count > 1 ? 's' : ''} applied`,
    reset_filters: 'Reset filters'
  },
  ja: {
    filter_count: (count: number) => `${count}件のフィルターが適用中`,
    reset_filters: 'フィルターをリセット'
  }
})

const isOpen = ref(true)

const group = computed(() => {
  const count: Count = { value: 0 }
  const group = lensFiltersToGroup(props.filters, '$and', count)
  return {
    count: count.value,
    group
  }
})

function lensFiltersToGroup(filters: any[], connector: '$and' | '$or', count: Count) {
  const group = newFilterGroup()

  group.connector = connector

  for (const filter of filters) {
    const [fieldOrConnector, operatorOrFilters, value] = filter

    if (!isConnector(fieldOrConnector)) {
      group.conditions.push({
        field: fieldOrConnector,
        operator: operatorOrFilters,
        value
      })
      count.value++
      continue
    }

    if (!Array.isArray(operatorOrFilters)) {
      throw new TypeError(`Invalid filter format: ${JSON.stringify(filter)}`)
    }

    group.groups.push(
      lensFiltersToGroup(operatorOrFilters, fieldOrConnector, count)
    )
  }

  return group
}

function newFilterGroup(): FilterGroup {
  return {
    connector: '$and',
    conditions: [],
    groups: []
  }
}

function isConnector(value: any): value is '$and' | '$or' {
  return value === '$and' || value === '$or'
}
</script>

<template>
  <SCardBlock class="LensCatalogStateFilter">
    <div v-if="!isOpen" class="closed">
      <span class="filter-count">{{ t.filter_count(group.count) }}</span>
    </div>
    <div v-else class="filters">
      <LensCatalogStateFilterGroup
        :fields
        :group="group.group"
        is-root
      />
    </div>
    <div class="actions">
      <button class="action" @click="$emit('reset')">
        <span class="action-icon"><IconX class="action-svg" /></span>
        <span class="action-text">{{ t.reset_filters }}</span>
      </button>
      <button class="action icon" @click="isOpen = !isOpen">
        <span class="action-icon">
          <IconArrowsInLineVertical v-if="isOpen" class="action-svg" />
          <IconArrowsOutLineVertical v-else class="action-svg" />
        </span>
      </button>
    </div>
  </SCardBlock>
</template>

<style scoped lang="postcss">
.LensCatalogStateFilter {
  display: flex;
  gap: 16px;
  padding: var(--lens-catalog-filters-block-padding, 12px);
}

.closed {
  flex-grow: 1;
  padding-left: 4px;
  line-height: 24px;
  font-size: 12px;
  color: var(--c-text-2);
}

.filters {
  flex-grow: 1;
}

.actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.action {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: 1px dashed var(--c-divider);
  border-radius: 6px;
  padding: 0 6px;
  height: 24px;
  font-size: 12px;
  color: var(--c-text-2);
  background-color: var(--c-bg-1);
  cursor: pointer;
  transition: background-color 0.25s;

  &.icon {
    padding: 0;
    width: 24px;
  }

  &:hover {
    background-color: var(--c-bg-2);
  }
}

.action-svg {
  width: 14px;
  height: 14px;
}
</style>

<script setup lang="ts">
import IconArrowsInLineVertical from '~icons/ph/arrows-in-line-vertical'
import IconArrowsOutLineVertical from '~icons/ph/arrows-out-line-vertical'
import IconX from '~icons/ph/x'
import { ref } from 'vue'
import { useLang, useTrans } from '../../../composables/Lang'
import { type FieldData } from '../FieldData'
import { type LensQuerySort } from '../LensQuery'

export interface Props {
  fields: Record<string, FieldData>
  sorts: LensQuerySort[]
}

const props = defineProps<Props>()

defineEmits<{
  reset: []
}>()

const lang = useLang()

const { t } = useTrans({
  en: {
    sort_count: (count: number) => `${count} sort${count > 1 ? 's' : ''} applied`,
    reset_sorts: 'Reset sorts'
  },
  ja: {
    sort_count: (count: number) => `${count}件のソートが適用中`,
    reset_sorts: 'ソートをリセット'
  }
})

const isOpen = ref(true)

const orderTextDict = {
  asc: 'ASC',
  desc: 'DESC'
}

function getFieldName(sort: LensQuerySort): string {
  return lang === 'ja'
    ? props.fields[sort[0]].labelJa
    : props.fields[sort[0]].labelEn
}

function getOrderText(sort: LensQuerySort): string {
  return orderTextDict[sort[1]]
}
</script>

<template>
  <SCardBlock class="LensCatalogStateSort">
    <div v-if="!isOpen" class="closed">
      <span class="sort-count">{{ t.sort_count(sorts.length) }}</span>
    </div>
    <div v-else class="sorts">
      <div v-for="sort in sorts" :key="sort[0]" class="sort">
        <div class="field">{{ getFieldName(sort) }}</div>
        <div class="order">{{ getOrderText(sort) }}</div>
      </div>
    </div>
    <div class="actions">
      <button class="action" @click="$emit('reset')">
        <span class="action-icon"><IconX class="action-svg" /></span>
        <span class="action-text">{{ t.reset_sorts }}</span>
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
.LensCatalogStateSort {
  display: flex;
  gap: 16px;
  padding: var(--lens-catalog-sorts-block-padding, 12px);
}

.closed {
  flex-grow: 1;
  padding-left: 4px;
  line-height: 24px;
  font-size: 12px;
  color: var(--c-text-2);
}

.sorts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex-grow: 1;
}

.sort {
  display: flex;
  gap: 1px;
  border: 1px dashed var(--c-divider);
  border-radius: 6px;
  background-color: var(--c-gutter);
  overflow: hidden;
}

.field,
.order {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;
  height: 22px;
  background-color: var(--c-bg-1);
}

.order {
  color: var(--c-text-2);
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

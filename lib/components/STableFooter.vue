<script setup lang="ts">
import { computed } from 'vue'
import { format } from '../support/Num'
import SIconChevronLeft from './icons/SIconChevronLeft.vue'
import SIconChevronRight from './icons/SIconChevronRight.vue'

const props = defineProps<{
  total?: number
  page?: number
  perPage?: number
  borderless?: boolean
  onPrev?(): void
  onNext?(): void
}>()

const _total = computed(() => props.total ?? 0)
const _page = computed(() => props.page ?? 0)
const _perPage = computed(() => props.perPage ?? 0)

const from = computed(() => {
  return _page.value === 1 ? 1 : (_page.value - 1) * _perPage.value + 1
})

const to = computed(() => {
  const value = _page.value * _perPage.value

  return value > _total.value ? _total.value : value
})

const hasPrev = computed(() => {
  return _page.value > 1
})

const hasNext = computed(() => {
  return to.value < _total.value
})
</script>

<template>
  <div class="STableFooter" :class="{ borderless }">
    <div class="container">
      <p class="info">{{ format(from) }}–{{ format(to) }} of {{ format(_total) }}</p>

      <div class="actions">
        <button class="button prev" :class="{ active: hasPrev }" @click="onPrev">
          <SIconChevronLeft class="icon" />
        </button>
        <button class="button next" :class="{ active: hasNext }" @click="onNext">
          <SIconChevronRight class="icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.STableFooter {
  border-radius: 0 0 6px 6px;
  padding-top: 8px;
  padding-right: var(--table-padding-right);
  padding-bottom: 8px;
  padding-left: var(--table-padding-left);
  background-color: var(--c-bg-elv-up);

  &.borderless {
    border-radius: 0;
  }
}

.container {
  display: flex;
  justify-content: flex-end;
}

.info {
  padding-right: 8px;
  padding-top: 4px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}

.actions {
  display: flex;
  padding-right: 8px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  color: var(--c-text-3);
  cursor: not-allowed;
  transition: color 0.25s, background-color 0.25s;

  &.active {
    color: var(--c-text-2);
    cursor: pointer;
  }

  &.active:hover {
    background-color: var(--c-bg-elv-down);
  }
}

.icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>

<script setup lang="ts">
import IconCaretLeft from '~icons/ph/caret-left-bold'
import IconCaretRight from '~icons/ph/caret-right-bold'
import { computed } from 'vue'
import { format } from '../support/Num'

const props = defineProps<{
  total?: number | null
  page?: number | null
  perPage?: number | null
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

      <div v-if="onPrev && onNext" class="actions">
        <button
          class="button prev"
          :class="{ active: hasPrev }"
          @click="() => hasPrev && onPrev?.()"
        >
          <IconCaretLeft class="icon" />
        </button>
        <button
          class="button next"
          :class="{ active: hasNext }"
          @click="() => hasNext && onNext?.()"
        >
          <IconCaretRight class="icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.STableFooter {
  border-top: 1px solid var(--c-gutter);
  border-radius: 0 0 calc(var(--table-border-radius) - 1px) calc(var(--table-border-radius) - 1px);
  padding-right: var(--table-padding-right);
  padding-left: var(--table-padding-left);
  background-color: var(--c-bg-elv-3);

  &.borderless {
    border-radius: 0;
  }
}

.container {
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  min-height: 47px;
}

.info {
  margin: 0;
  padding: 13px 0 10px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}

.actions {
  display: flex;
  margin-right: -8px;
  padding: 8px 0 7px;

  .info + & {
    padding-left: 8px;
  }
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
    background-color: var(--c-bg-elv-1);
  }
}

.icon {
  width: 16px;
  height: 16px;
}
</style>

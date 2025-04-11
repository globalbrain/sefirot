<script setup lang="ts">
import IconCaretLeft from '~icons/ph/caret-left-bold'
import IconCaretRight from '~icons/ph/caret-right-bold'
import { computed } from 'vue'
import { useTrans } from '../composables/Lang'
import { format } from '../support/Num'
import SButton from './SButton.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Align = 'left' | 'center' | 'right'

const props = withDefaults(defineProps<{
  size?: Size
  align?: Align
  total: number
  page: number
  perPage: number
}>(), {
  size: 'medium',
  align: 'center'
})

const emit = defineEmits<{
  prev: []
  next: []
}>()

const { t } = useTrans({
  en: { prev: 'Prev', next: 'Next' },
  ja: { prev: '前へ', next: '次へ' }
})

const from = computed(() => {
  return props.page === 1 ? 1 : (props.page - 1) * props.perPage + 1
})

const to = computed(() => {
  const value = props.page * props.perPage

  return value > props.total ? props.total : value
})

const hasPrev = computed(() => {
  return props.page > 1
})

const hasNext = computed(() => {
  return to.value < props.total
})

function prev() {
  hasPrev.value && emit('prev')
}

function next() {
  hasNext.value && emit('next')
}
</script>

<template>
  <div class="SPagination" :class="[size, align]">
    <div class="button prev">
      <SButton
        type="outline"
        mode="mute"
        :size="size"
        :lead-icon="IconCaretLeft"
        :label="t.prev"
        :disabled="!hasPrev"
        @click="prev"
      />
    </div>
    <div class="text">
      {{ format(from) }}–{{ format(to) }} of {{ format(props.total) }}
    </div>
    <div class="button next">
      <SButton
        type="outline"
        mode="mute"
        :size="size"
        :trail-icon="IconCaretRight"
        :label="t.next"
        :disabled="!hasNext"
        @click="next"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SPagination {
  display: flex;
  align-items: center;
}

.text {
  padding: 0 8px;
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text-2);
}

.SPagination.mini {
  gap: 8px;
}

.SPagination.small {
  gap: 8px;
}

.SPagination.medium {
  gap: 12px;
}

.SPagination.left {
  .prev { order: 1; }
  .next { order: 2; }
  .text { order: 3; }
}

.SPagination.center {
  .prev { order: 1; }
  .text { order: 2; }
  .next { order: 3; }
}

.SPagination.right {
  .text { order: 1; }
  .prev { order: 2; }
  .next { order: 3; }
}
</style>

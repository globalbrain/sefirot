<script setup lang="ts">
import { useControlPosition, useControlSize } from '../composables/Control'
import SPagination, { type Size } from './SPagination.vue'

defineProps<{
  size?: Size
  total: number
  page: number
  perPage: number
}>()

defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()

const size = useControlSize()
const position = useControlPosition()
</script>

<template>
  <div class="SControlPagination">
    <SPagination
      :size="size"
      :align="position"
      :total="total"
      :page="page"
      :per-page="perPage"
      @prev="$emit('prev')"
      @next="$emit('next')"
    />
  </div>
</template>

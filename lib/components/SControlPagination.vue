<script setup lang="ts">
import { useControlPosition, useControlSize } from '../composables/Control'
import SPagination, { type Size } from './SPagination.vue'

defineProps<{
  size?: Size
  disabled?: boolean
  total: number
  page: number
  perPage: number
}>()

defineEmits<{
  prev: []
  next: []
}>()

const size = useControlSize()
const position = useControlPosition()
</script>

<template>
  <div class="SControlPagination">
    <SPagination
      :size
      :disabled
      :align="position"
      :total
      :page
      :per-page
      @prev="$emit('prev')"
      @next="$emit('next')"
    />
  </div>
</template>

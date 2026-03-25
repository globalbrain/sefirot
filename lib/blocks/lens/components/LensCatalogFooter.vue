<script setup lang="ts">
import SPagination from '../../../components/SPagination.vue'
import { type LensResult } from '../LensResult'

defineProps<{
  result: LensResult
  loading: boolean
}>()

defineEmits<{
  prev: []
  next: []
}>()
</script>

<template>
  <div class="LensCatalogFooter">
    <SPagination
      size="small"
      align="right"
      :total="result.pagination.total"
      :page="result.pagination.page"
      :per-page="result.pagination.perPage"
      :disabled="loading"
      @prev="$emit('prev')"
      @next="$emit('next')"
    />
  </div>
</template>

<style scoped>
.LensCatalogFooter {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  margin-top: -1px;
  border-top: 1px solid var(--c-gutter);
  border-radius: 0 0 5px 5px;
  padding: var(--lens-catalog-footer-padding, 0 12px);
  height: 57px;
  background-color: var(--c-bg-1);
}
</style>

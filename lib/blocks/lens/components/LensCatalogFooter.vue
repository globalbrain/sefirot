<script setup lang="ts">
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
    <SControl>
      <SControlRight>
        <SControlPagination
          :total="result.pagination.total"
          :page="result.pagination.page"
          :per-page="result.pagination.perPage"
          :disabled="loading"
          @prev="$emit('prev')"
          @next="$emit('next')"
        />
      </SControlRight>
    </SControl>
  </div>
</template>

<style scoped lang="postcss">
.LensCatalogFooter {
  position: relative;
  z-index: 10;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-top: -1px;
  border-top: 1px solid var(--c-gutter);
  border-radius: 0 0 5px 5px;
  padding: var(--lens-catalog-footer-padding, 0 12px);
  height: 57px;
  background-color: var(--c-bg-1);
}
</style>

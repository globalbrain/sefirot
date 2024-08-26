<script setup lang="ts">
import SPill, { type Mode } from './SPill.vue'

defineProps<{
  pill?: string
  color?: Mode
}>()
</script>

<template>
  <div class="STableCellPill" :class="[color || 'neutral']">
    <SPill v-if="pill" size="mini" :mode="color" :label="pill" />
  </div>
</template>

<style scoped lang="postcss">
.STableCellPill {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  min-height: 40px;
}
</style>

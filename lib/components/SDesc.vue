<script setup lang="ts">
import { provide } from 'vue'
import SGrid from './SGrid.vue'

const props = withDefaults(defineProps<{
  cols?: string | number
  gap?: string | number
  dir?: 'column' | 'row'
  labelWidth?: string | number
  divider?: boolean
}>(), {
  dir: 'column',
  divider: true
})

provide('sefirot-desc-label-width', () => props.labelWidth)
</script>

<template>
  <SGrid
    class="SDesc"
    :class="[dir, { divider }]"
    :cols
    :gap
  >
    <slot />
  </SGrid>
</template>

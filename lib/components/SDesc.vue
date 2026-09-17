<script setup lang="ts">
import { provide } from 'vue'
import { type Responsive, useResponsive } from '../composables/Layout'
import SGrid from './SGrid.vue'

const props = withDefaults(defineProps<{
  cols?: Responsive<string | number>
  gap?: Responsive<string | number>
  dir?: Responsive<'column' | 'row'>
  wrap?: Responsive<boolean>
  labelWidth?: Responsive<string | number>
  divider?: boolean
}>(), {
  dir: 'column',
  divider: true,
  wrap: undefined
})

const dir = useResponsive(() => props.dir)
const labelWidth = useResponsive(() => props.labelWidth || undefined)
const wrap = useResponsive(() => props.wrap ?? { desktop: false, mobile: true })

provide('sefirot-desc-label-width', () => labelWidth.value)
provide('sefirot-desc-wrap', wrap)
</script>

<template>
  <SGrid
    class="SDesc"
    :class="[dir, { divider, wrap }]"
    :cols
    :gap
  >
    <slot />
  </SGrid>
</template>

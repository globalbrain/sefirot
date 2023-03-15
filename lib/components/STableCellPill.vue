<script setup lang="ts">
import { computed } from 'vue'
import SPill from './SPill.vue'

export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  value?: any
  record: any
  getter?: string | ((value: any, record: any) => string)
  color?: Color | ((value: any, record: any) => Color)
}>()

const _value = computed(() => {
  if (props.getter === undefined) {
    return props.value
  }

  return typeof props.getter === 'string'
    ? props.getter
    : props.getter(props.value, props.record)
})

const _color = computed(() => {
  if (props.color === undefined) {
    return props.color
  }

  return typeof props.color === 'string'
    ? props.color
    : props.color(props.value, props.record)
})
</script>

<template>
  <div class="STableCellPill" :class="[_color ?? 'neutral']">
    <SPill
      v-if="_value"
      size="mini"
      :mode="_color"
      :label="_value"
    />
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

<script setup lang="ts">
import { type Component, computed } from 'vue'
import SButton, { type Tooltip } from './SButton.vue'

export interface ActionListItem {
  leadIcon?: Component
  link?: string
  label?: string
  disabled?: boolean
  tooltip?: Tooltip
  onClick?: () => void
}

const props = defineProps<ActionListItem>()

const _tooltip = computed<Tooltip | undefined>(() => {
  return props.tooltip ? { display: 'block', ...props.tooltip } : undefined
})
</script>

<template>
  <div class="SActionListItem">
    <SButton
      block
      size="small"
      type="text"
      :icon="leadIcon"
      :label="label"
      :href="link"
      :disabled="disabled"
      :tooltip="_tooltip"
      @click="onClick"
    />
  </div>
</template>

<style scoped lang="postcss">
.SActionListItem {
  --button-font-size: 14px;

  :deep(.SButton),
  :slotted(.SButton) {
    justify-content: flex-start;
    font-weight: 400;
  }
}
</style>

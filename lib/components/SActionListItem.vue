<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import { computed } from 'vue'
import SButton, { type Tooltip } from './SButton.vue'

export interface ActionListItem {
  leadIcon?: IconifyIcon
  link?: string
  label?: string
  disabled?: boolean
  tooltip?: Tooltip
  onClick?: () => void

  /** @deprecated Use `:label` instead. */
  text?: string
}

const props = defineProps<ActionListItem>()

const _label = computed(() => {
  return props.label ?? props.text
})

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
      :label="_label"
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

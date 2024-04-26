<script setup lang="ts">
import IconArrowsInLineVertical from '@iconify-icons/ph/arrows-in-line-vertical-bold'
import IconArrowsOutLineVertical from '@iconify-icons/ph/arrows-out-line-vertical-bold'
import { computed, shallowRef } from 'vue'
import { useCardState } from '../composables/Card'
import SButton, { type Tooltip } from './SButton.vue'

const props = defineProps<{
  collapsed?: boolean
  disabled?: boolean
  tooltip?: string | Tooltip
}>()

defineEmits<{
  (e: 'click'): void
}>()

const { isCollapsed, setCollapse, toggleCollapse } = useCardState()

setCollapse(props.collapsed)

const el = shallowRef<HTMLElement | null>(null)

const icon = computed(() => {
  return isCollapsed.value
    ? IconArrowsOutLineVertical
    : IconArrowsInLineVertical
})
</script>

<template>
  <div
    class="SCardHeaderActionCollapse"
    :class="{ collapsed: isCollapsed }"
    ref="el"
  >
    <SButton
      type="text"
      mode="mute"
      size="small"
      :icon="icon"
      :disabled="disabled"
      :tooltip="tooltip"
      @click="toggleCollapse"
    />
  </div>
</template>

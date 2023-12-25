<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import SIcon from './SIcon.vue'
import SLink from './SLink.vue'

export interface ActionListItem {
  leadIcon?: IconifyIcon
  text?: string
  link?: string
  disabled?: boolean
  onClick?(): void
}

defineProps<ActionListItem>()
</script>

<template>
  <component
    :is="link ? SLink : 'button'"
    class="SActionList"
    :href="link"
    @click="() => onClick?.()"
  >
    <span v-if="leadIcon" class="lead-icon">
      <SIcon class="lead-icon-svg" :icon="leadIcon" />
    </span>
    <span class="text">{{ text }}</span>
  </component>
</template>

<style scoped lang="postcss">
.SActionList {
  display: flex;
  gap: 8px;
  border-radius: 6px;
  padding: 4px 8px;
  width: 100%;
  text-align: left;
  line-height: 24px;
  font-size: 14px;
  transition: background-color 0.25s;

  &:hover {
    background-color: var(--c-bg-mute-1);
  }

  &:active {
    background-color: var(--c-bg-mute-2);
    transition: background-color 0.1s;
  }
}

.lead-icon {
  display: flex;
  align-items: center;
  height: 24px;
  flex-shrink: 0;
  color: var(--c-text-2);
}

.lead-icon-svg {
  width: 16px;
  height: 16px;
}
</style>

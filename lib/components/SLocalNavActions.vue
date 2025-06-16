<script setup lang="ts">
import { type Component } from 'vue'
import SButton, { type Mode, type Tooltip, type Type } from './SButton.vue'

export interface Action {
  tag?: Component | string
  type?: Type
  mode?: Mode
  icon?: Component
  leadIcon?: Component
  trailIcon?: Component
  iconMode?: Mode
  label?: string
  labelMode?: Mode
  href?: string
  loading?: boolean
  disabled?: boolean
  tooltip?: string | Tooltip
  onClick?(): void
}

defineProps<{
  actions: Action[]
}>()
</script>

<template>
  <div class="SLocalNavActions">
    <div v-for="action, i in actions" :key="i" class="action">
      <SButton
        size="small"
        :tag="action.tag"
        :type="action.type"
        :mode="action.mode"
        :icon="action.icon"
        :lead-icon="action.leadIcon"
        :trail-icon="action.trailIcon"
        :icon-mode="action.iconMode"
        :label="action.label"
        :label-mode="action.labelMode"
        :href="action.href"
        :loading="action.loading"
        :disabled="action.disabled"
        :tooltip="action.tooltip"
        @click="() => { action.onClick?.() }"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SLocalNavActions {
  display: flex;
  flex-shrink: 0;
  gap: 8px;
}
</style>

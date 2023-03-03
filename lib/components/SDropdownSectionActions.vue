<script setup lang="ts">
import type { DropdownSectionActionsOption } from '../composables/Dropdown'

defineProps<{
  options: DropdownSectionActionsOption[]
}>()
</script>

<template>
  <div class="SDropdownSectionActions">
    <div v-for="option in options" :key="option.label" class="item">
      <button class="button" :class="[option.mode ?? 'neutral']" @click="option.onClick">
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDropdownSectionActions {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
}

.button {
  display: block;
  border-radius: 6px;
  padding: 0 8px;
  width: 100%;
  text-align: left;
  line-height: 32px;
  font-size: 12px;
  font-weight: 500;
  transition: color 0.25s, background-color 0.25s;

  &.neutral        { color: var(--button-text-neutral-text-color); }
  &.neutral:hover  { background-color: var(--button-text-neutral-hover-bg-color); }
  &.neutral:active { background-color: var(--button-text-neutral-active-bg-color); }

  &.mute        { color: var(--button-text-mute-text-color); }
  &.mute:hover  { background-color: var(--button-text-mute-hover-bg-color); }
  &.mute:active { background-color: var(--button-text-mute-active-bg-color); }

  &.info        { color: var(--button-text-info-text-color); }
  &.info:hover  { background-color: var(--button-text-info-hover-bg-color); }
  &.info:active { background-color: var(--button-text-info-active-bg-color); }

  &.success        { color: var(--button-text-success-text-color); }
  &.success:hover  { background-color: var(--button-text-success-hover-bg-color); }
  &.success:active { background-color: var(--button-text-success-active-bg-color); }

  &.warning        { color: var(--button-text-warning-text-color); }
  &.warning:hover  { background-color: var(--button-text-warning-hover-bg-color); }
  &.warning:active { background-color: var(--button-text-warning-active-bg-color); }

  &.danger        { color: var(--button-text-danger-text-color); }
  &.danger:hover  { background-color: var(--button-text-danger-hover-bg-color); }
  &.danger:active { background-color: var(--button-text-danger-active-bg-color); }
}
</style>

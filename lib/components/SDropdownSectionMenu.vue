<script setup lang="ts">
import { type DropdownSectionMenuOption } from '../composables/Dropdown'

defineProps<{
  options: DropdownSectionMenuOption[]
}>()
</script>

<template>
  <ul class="SDropdownSectionMenu">
    <li v-for="option in options" :key="option.label" class="item">
      <button
        class="button"
        @click="option.onClick"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </button>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
.SDropdownSectionMenu {
  padding: 8px;
  background-color: var(--c-bg-elv-3);
}

.button {
  display: block;
  border-radius: 6px;
  padding: 0 8px;
  width: 100%;
  text-align: left;
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  transition: color 0.25s, background-color 0.25s;

  &:hover:not(:disabled) {
    background-color: var(--c-bg-mute-1);
  }

  &:disabled {
    color: var(--c-text-3);
    cursor: not-allowed;
  }
}
</style>

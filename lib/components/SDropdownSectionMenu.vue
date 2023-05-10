<script setup lang="ts">
import { type DropdownSectionMenuOption } from '../composables/Dropdown'

defineProps<{
  options: DropdownSectionMenuOption[]
}>()
</script>

<template>
  <ul class="SDropdownSectionMenu">
    <li v-for="option in options" :key="option.label" class="item">
      <button class="button" @click="option.onClick">
        {{ option.label }}
      </button>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
.SDropdownSectionMenu {
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
  font-weight: 400;
  transition: color 0.25s, background-color 0.25s;

  &:hover {
    background-color: var(--c-bg-elv-down);
  }
}
</style>

<script setup lang="ts">
import { DropdownSection } from '../composables/Dropdown'
import SDropdownSectionFilter from './SDropdownSectionFilter.vue'
import SDropdownSectionMenu from './SDropdownSectionMenu.vue'

defineProps<{
  section: DropdownSection
}>()
</script>

<template>
  <SDropdownSectionMenu
    v-if="section.type === 'menu'"
    :options="section.options"
  />
  <SDropdownSectionFilter
    v-else-if="section.type === 'filter'"
    :search="section.search"
    :selected="section.selected"
    :options="section.options"
    :on-click="section.onClick"
  />
</template>

<style scoped lang="postcss">
.SDropdown {
  border: 1px solid var(--c-divider-light);
  border-radius: 12px;
  min-width: 256px;
  max-height: 384px;
  background-color: var(--c-bg);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .dark & {
    background-color: var(--c-bg-mute);
  }
}

.section {
  & + & {
    border-top: 1px solid var(--c-divider-light);
  }
}
</style>

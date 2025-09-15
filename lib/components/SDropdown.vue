<script setup lang="ts">
import { type DropdownSection } from '../composables/Dropdown'
import SDropdownSection from './SDropdownSection.vue'

defineProps<{
  sections: DropdownSection[]
}>()
</script>

<template>
  <div class="SDropdown">
    <div class="container">
      <div v-for="(section, i) in sections" :key="i" class="section">
        <SDropdownSection :section />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDropdown {
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  min-width: 288px;
  max-height: 364px;
  overflow-y: auto;
  white-space: normal;

  &::-webkit-scrollbar {
    display: none;
  }
}

.container {
  display: grid;
  gap: 1px;
  background-color: var(--c-gutter);
}
</style>

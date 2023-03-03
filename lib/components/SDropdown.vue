<script setup lang="ts">
import type { DropdownSection } from '../composables/Dropdown'
import SDropdownSection from './SDropdownSection.vue'

defineProps<{
  sections: DropdownSection[]
}>()
</script>

<template>
  <div class="SDropdown">
    <div class="container">
      <div v-for="(section, index) in sections" :key="index" class="section">
        <SDropdownSection :section="section" />
      </div>
    </div>
  </div>
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

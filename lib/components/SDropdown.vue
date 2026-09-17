<script setup lang="ts">
import { type DropdownSection } from '../composables/Dropdown'
import { useOverlays } from '../composables/Overlays'
import SDropdownSection from './SDropdownSection.vue'

defineProps<{
  sections: DropdownSection[]
}>()
const managed = useOverlays()
</script>

<template>
  <div class="SDropdown" :class="{ managed }">
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
.SDropdown.managed {
  min-width: min(288px, var(--dropdown-max-width, calc(100vw - 24px)));
  max-width: var(--dropdown-max-width, calc(100vw - 24px));
  max-height: min(364px, var(--dropdown-max-height, calc(100dvh - 24px)));
  overflow-wrap: anywhere;
  overscroll-behavior: contain;
}
</style>

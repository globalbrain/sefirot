<script setup lang="ts">
import SActionList, { type ActionList } from './SActionList.vue'

defineProps<{
  options: ActionList
}>()
</script>

<template>
  <div class="SDropdownSectionMenu">
    <SActionList :list="options" />
  </div>
</template>

<style scoped lang="postcss">
.SDropdownSectionMenu {
  padding: 8px;
  background-color: var(--c-bg-elv-3);
}
</style>

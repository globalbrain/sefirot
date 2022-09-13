<script setup lang="ts">
import { TableDropdownSection } from '../composables/Table'
import STableDropdownSectionFilter from './STableDropdownSectionFilter.vue'
import STableDropdownSectionMenu from './STableDropdownSectionMenu.vue'

defineProps<{
  sections: TableDropdownSection[]
}>()
</script>

<template>
  <div class="STableColumnDropdown">
    <div v-for="(item, index) in sections" :key="index" class="section">
      <STableDropdownSectionMenu
        v-if="item.type === 'menu'"
        :options="item.options"
      />
      <STableDropdownSectionFilter
        v-else-if="item.type === 'filter'"
        :search="item.search"
        :selected="item.selected"
        :options="item.options"
        :on-click="item.onClick"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.STableColumnDropdown {
  border: 1px solid var(--c-divider-light);
  border-radius: 12px;
  min-width: 256px;
  background-color: var(--c-bg);

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

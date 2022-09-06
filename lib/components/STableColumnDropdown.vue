<script setup lang="ts">
import STableColumnDropdownFilter, { TableColumnDropdownItemFilterOption } from './STableColumnDropdownFilter.vue'
import STableColumnDropdownMenu, { TableColumnDropdownItemMenuOption } from './STableColumnDropdownMenu.vue'

export type TableColumnDropdownItem =
  | TableColumnDropdownItemMenu
  | TableColumnDropdownItemFilter

export type TableColumnDropdownItemType = 'menu' | 'filter'

export interface TableColumnDropdownItemBase {
  type: TableColumnDropdownItemType
}

export interface TableColumnDropdownItemMenu {
  type: 'menu'
  options: TableColumnDropdownItemMenuOption[]
}

export interface TableColumnDropdownItemFilter {
  type: 'filter'
  search?: boolean
  selected: string[]
  options: TableColumnDropdownItemFilterOption[]
}

defineProps<{
  dropdown: TableColumnDropdownItem[]
}>()
</script>

<template>
  <div class="STableColumnDropdown">
    <div v-for="(item, index) in dropdown" :key="index" class="section">
      <STableColumnDropdownMenu
        v-if="item.type === 'menu'"
        :options="item.options"
      />
      <STableColumnDropdownFilter
        v-else-if="item.type === 'filter'"
        :search="item.search"
        :selected="item.selected"
        :options="item.options"
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

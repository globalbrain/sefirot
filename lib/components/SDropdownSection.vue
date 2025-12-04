<script setup lang="ts">
import { type DropdownSection } from '../composables/Dropdown'
import SDropdownSectionActions from './SDropdownSectionActions.vue'
import SDropdownSectionComponent from './SDropdownSectionComponent.vue'
import SDropdownSectionDateRange from './SDropdownSectionDateRange.vue'
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
    :query="section.query"
    :active="section.active"
    :on-click="section.onClick"
  />
  <SDropdownSectionDateRange
    v-else-if="section.type === 'date-range'"
    :range="section.range"
    :on-apply="section.onApply"
  />
  <SDropdownSectionActions
    v-else-if="section.type === 'actions'"
    :options="section.options"
  />
  <SDropdownSectionComponent
    v-else-if="section.type === 'component'"
    :comp="section.component"
    :props="section.props"
  />
</template>

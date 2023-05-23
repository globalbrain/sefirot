<script setup lang="ts">
import { type DropdownSection } from '../composables/Dropdown'
import SDropdownSectionActions from './SDropdownSectionActions.vue'
import SDropdownSectionComponent from './SDropdownSectionComponent.vue'
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
  <SDropdownSectionActions
    v-if="section.type === 'actions'"
    :options="section.options"
  />
  <SDropdownSectionComponent
    v-else-if="section.type === 'component'"
    :comp="section.component"
  />
</template>

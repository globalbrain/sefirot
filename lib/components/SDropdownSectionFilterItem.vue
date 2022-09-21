<script setup lang="ts">
import { DropdownSectionFilterOption } from '../composables/Dropdown'
import SDropdownSectionFilterItemAvatar from './SDropdownSectionFilterItemAvatar.vue'
import SDropdownSectionFilterItemText from './SDropdownSectionFilterItemText.vue'

defineProps<{
  option: DropdownSectionFilterOption
}>()
</script>

<template>
  <SDropdownSectionFilterItemText
    v-if="option.type === 'text' || option.type === undefined"
    :label="option.label"
  />
  <SDropdownSectionFilterItemAvatar
    v-else-if="option.type === 'avatar'"
    :label="option.label"
    :image="option.image"
  />
</template>

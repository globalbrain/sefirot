<script setup lang="ts">
import { computed } from 'vue'
import { type DropdownSectionMenuOption } from '../composables/Dropdown'
import SActionList from './SActionList.vue'

const props = defineProps<{
  options: DropdownSectionMenuOption[]
}>()

const _options = computed(() => {
  return props.options.map((option) => {
    return option.label
      ? { text: option.label, ...option }
      : option
  })
})
</script>

<template>
  <div class="SDropdownSectionMenu">
    <SActionList :list="_options" />
  </div>
</template>

<style scoped lang="postcss">
.SDropdownSectionMenu {
  padding: 8px;
  background-color: var(--c-bg-elv-3);
}
</style>

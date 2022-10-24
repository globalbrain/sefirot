<script setup lang="ts">
import xor from 'lodash-es/xor'
import SDropdown from 'sefirot/components/SDropdown.vue'
import { createDropdown } from 'sefirot/composables/Dropdown'
import { ref } from 'vue'

const selected = ref<string[]>([])

const sections = createDropdown([
  {
    type: 'menu',
    options: [
      { label: 'Sort ascending (A...Z)', onClick: () => {} },
      { label: 'Sort descending (Z...A)', onClick: () => {} }
    ]
  },
  {
    type: 'filter',
    search: true,
    selected,
    options: [
      { label: 'Draft', value: 'Draft' },
      { label: 'Published', value: 'Published' },
      { label: 'Archived', value: 'Archived' }
    ],
    onClick: updateFilter
  }
])

function updateFilter(value: string) {
  selected.value = xor(selected.value, [value])
}
</script>

<template>
  <Story title="Components/SDropdown">
    <div class="container">
      <SDropdown :sections="sections" />
    </div>
  </Story>
</template>

<style scoped>
.container {
  max-width: 256px;
}
</style>

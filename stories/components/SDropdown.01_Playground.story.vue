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
      { label: 'Select all', onClick: selectAll },
      { label: 'Clear all', onClick: clearAll }
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
  },
  {
    type: 'actions',
    options: [
      { mode: 'mute', label: 'Cancel', onClick: () => {} },
      { mode: 'info', label: 'Apply', onClick: () => {} }
    ]
  }
])

function updateFilter(value: string) {
  selected.value = xor(selected.value, [value])
}

function selectAll() {
  selected.value = ['Draft', 'Published', 'Archived']
}

function clearAll() {
  selected.value = []
}
</script>

<template>
  <Board
    title="Components / SDropdown / 01. Playground"
  >
    <div class="max-w-256">
      <SDropdown :sections="sections" />
    </div>
  </Board>
</template>

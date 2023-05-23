<script setup lang="ts">
import xor from 'lodash-es/xor'
import SDropdown from 'sefirot/components/SDropdown.vue'
import { createDropdown } from 'sefirot/composables/Dropdown'
import { ref } from 'vue'

const title = 'Components / SDropdown / 01. Playground'

const selected = ref<string[]>([])

const sections = createDropdown([
  {
    type: 'menu',
    options: [
      {
        label: 'Select all',
        onClick() {
          selected.value = ['Draft', 'Published', 'Archived']
        }
      },
      {
        label: 'Clear all',
        onClick() {
          selected.value = []
        }
      }
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
    onClick(value: string) {
      selected.value = xor(selected.value, [value])
    }
  },
  {
    type: 'actions',
    options: [
      { mode: 'mute', label: 'Cancel', onClick: () => {} },
      { mode: 'info', label: 'Apply', onClick: () => {} }
    ]
  }
])
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <div class="max-w-256">
        <SDropdown :sections="sections" />
      </div>
    </Board>
  </Story>
</template>

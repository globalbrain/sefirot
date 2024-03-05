<script setup lang="ts">
import SInputDropdown, { type OptionAvatar } from 'sefirot/components/SInputDropdown.vue'
import { ref } from 'vue'

const title = 'Components / SInputDropdown / 02. Avatar Options'

const value = ref<string[]>([])

const options: OptionAvatar[] = [
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=4', label: 'Kris James', value: 1 },
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=5', label: 'Becky Lu', value: 2 },
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=7', label: 'Thomas Wane', value: 3 },
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=8', label: 'Linda Smith', value: 4 },
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=9', label: 'Monica Green', value: 5 },
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=10', label: 'Sefia Blue', value: 6 }
]
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <SInputDropdown
        label="Dropdown input"
        placeholder="Select items"
        :options="options"
        nullable
        v-model="value"
      />
    </Board>
  </Story>
</template>

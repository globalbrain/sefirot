<script setup lang="ts">
import SInputSegments from 'sefirot/components/SInputSegments.vue'
import { ref } from 'vue'

const title = 'Components / SInputSegments / 03. Disable Option'
const docs = '/components/input-segments'

const options = [
  { label: 'Active 1', value: 'active-1' } as const,
  { label: 'Active 2', value: 'active-2' } as const,
  { label: 'Disabled', value: 'disabled', disabled: true } as const
]

const value = ref('active-1')
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title" :docs="docs">
      <SInputSegments
        :options="options"
        v-model="value"
      />
    </Board>
  </Story>
</template>

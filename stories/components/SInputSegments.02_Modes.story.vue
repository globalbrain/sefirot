<script setup lang="ts">
import SInputSegments from 'sefirot/components/SInputSegments.vue'
import { ref } from 'vue'

const title = 'Components / SInputSegments / 02. Modes'
const docs = '/components/input-segments'

const options = [
  { label: 'Default', value: 'default', mode: 'default' } as const,
  { label: 'Mute', value: 'mute', mode: 'mute' } as const,
  { label: 'Neutral', value: 'neutral', mode: 'neutral' } as const,
  { label: 'Info', value: 'info', mode: 'info' } as const,
  { label: 'Success', value: 'success', mode: 'success' } as const,
  { label: 'Warning', value: 'warning', mode: 'warning' } as const,
  { label: 'Danger', value: 'danger', mode: 'danger' } as const
]

const value = ref('default')
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

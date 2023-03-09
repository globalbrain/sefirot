<script setup lang="ts">
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import { ref } from 'vue'

const title = 'Components / SInputDropdown / 01. Playground'

const value = ref<string[]>([])

const options = [
  { label: 'Vue.js', value: 'vuejs' },
  { label: 'Vite', value: 'vite' },
  { label: 'Adonis', value: 'adonis' },
  { label: 'Rails', value: 'rails' },
  { label: 'Sinatra', value: 'sinatra' },
  { label: 'Laravel', value: 'laravel' },
  { label: 'Phoenix', value: 'phoenix' }
]
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <SInputDropdown
        label="Dropdown input"
        info="Some helpful information."
        placeholder="Please select items"
        :options="options"
        nullable
        v-model="value"
      />
    </Board>
  </Story>
</template>

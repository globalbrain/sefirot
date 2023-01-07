<script setup lang="ts">
import SInputCheckboxes from 'sefirot/components/SInputCheckboxes.vue'
import { ref } from 'vue'

const input = ref([])

const options = [
  { label: 'Check box 1', value: 1 },
  { label: 'Check box 2', value: 2 },
  { label: 'Check box 3', value: 3 }
]
</script>

<template>
  <Board
    title="Components / SInputCheckboxes / 01. Playground"
  >
    <SInputCheckboxes
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      :options="options"
      v-model="input"
    />
  </Board>
</template>

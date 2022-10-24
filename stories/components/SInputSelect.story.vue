<script setup lang="ts">
import SInputSelect from 'sefirot/components/SInputSelect.vue'
import { ref } from 'vue'

const input = ref<number | null>(null)

const options = [
  { label: 'First option', value: 1 },
  { label: 'Second option', value: 2 },
  { label: 'Third option', value: 3 }
]
</script>

<template>
  <Story title="Components/SInputSelect">
    <SInputSelect
      v-model="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="Please select an item"
      :options="options"
    />
  </Story>
</template>

<docs lang="md">
# SInputSelect
</docs>

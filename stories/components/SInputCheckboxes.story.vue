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
  <Story title="Components / SInputCheckboxes">
    <SInputCheckboxes
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      :options="options"
      v-model="input"
    />
  </Story>
</template>

<docs lang="md">
# SButtonGroup

Button Group allow users to select one of the buttons. Similar checkboxes, but with look of buttons.
</docs>

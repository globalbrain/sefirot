<script setup lang="ts">
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <Board
    title="Components / SInputTextarea / 01. Playground"
  >
    <SInputTextarea
      name="name"
      label="Label"
      info="Some helpful information."
      note="Note text"
      help="This is a help text."
      placeholder="Placeholder text."
      :rows="5"
      v-model="text"
    />
  </Board>
</template>

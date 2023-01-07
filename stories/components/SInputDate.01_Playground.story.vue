<script setup lang="ts">
import SInputDate from 'sefirot/components/SInputDate.vue'
import { ref } from 'vue'

const value = ref(null)
</script>

<template>
  <Board
    title="Components / SInputDate / 01. Playground"
  >
    <SInputDate
      label="Label"
      note="Note text"
      text="Text for the checkbox"
      help="This is a help text."
      v-model="value"
    />
  </Board>
</template>

<script setup lang="ts">
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <Board
    title="Components / SInputCheckbox / 01. Playground"
  >
    <SInputCheckbox
      label="Label"
      info="Some helpful information."
      note="Note text"
      text="Text for the checkbox"
      help="This is a help text."
      v-model="value"
    />
  </Board>
</template>

<script setup lang="ts">
import SInputDate from 'sefirot/components/SInputDate.vue'
import { ref } from 'vue'

const value = ref(null)
</script>

<template>
  <Story title="Components/SInputDate">
    <SInputDate
      label="Label"
      note="Note text"
      text="Text for the checkbox"
      help="This is a help text."
      v-model="value"
    />
  </Story>
</template>

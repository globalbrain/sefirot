<script setup lang="ts">
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <Story title="Components/SInputCheckbox">
    <SInputCheckbox
      label="Label"
      note="Note text"
      text="Text for the checkbox"
      help="This is a help text."
      v-model="value"
    />
  </Story>
</template>

<docs lang="md">
# SInputCheckbox
</docs>

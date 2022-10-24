<script setup lang="ts">
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <Story title="Components/SInputTextarea">
    <SInputTextarea
      name="name"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="Placeholder text."
      :rows="5"
      v-model="text"
    />
  </Story>
</template>

<docs lang="md">
# SInputTextarea
</docs>

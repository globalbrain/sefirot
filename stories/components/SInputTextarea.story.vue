<script setup lang="ts">
import { ref } from 'vue'
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'

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

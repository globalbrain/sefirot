<script setup lang="ts">
import SInputNumber from 'sefirot/components/SInputNumber.vue'
import { ref } from 'vue'

const value = ref<number | null>(null)
</script>

<template>
  <Story title="Components/SInputNumber">
    <SInputNumber
      name="name"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="123,456,789"
      separator
      v-model="value"
    />
  </Story>
</template>

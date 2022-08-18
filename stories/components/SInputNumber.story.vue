<script setup lang="ts">
import { ref } from 'vue'
import SInputNumber from 'sefirot/components/SInputNumber.vue'

const value = ref<number | null>(null)
</script>

<template>
  <Story title="Components/SInputNumber">
    <SInputNumber
      name="name"
      label="Label"
      note="Note text"
      help="This is a help text."
      placeholder="123456789"
      v-model="value"
    />
  </Story>
</template>

<docs lang="md">
# SInputNumber


</docs>

<script setup lang="ts">
import SInputRadios from 'sefirot/components/SInputRadios.vue'
import { ref } from 'vue'

const value = ref(1)

const options = [
  { label: 'Radio button 1', value: 1 },
  { label: 'Radio button 2', value: 2 },
  { label: 'Radio button 3', value: 3 }
]
</script>

<template>
  <Story title="Components/SInputRadios">
    <SInputRadios
      name="input"
      label="Label"
      note="Note text"
      help="This is a help text."
      :nullable="false"
      :options="options"
      v-model="value"
    />
  </Story>
</template>

<docs lang="md">
# SInputRadios
</docs>

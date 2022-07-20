<script setup lang="ts">
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import { ref } from 'vue'

const checkboxValue = ref(false)
</script>

<template>
  <Story title="Components/SInputCheckbox">
    <SInputCheckbox
      name="checkbox"
      label="Checkbox"
      v-model="checkboxValue"
    />
  </Story>
</template>

<docs lang="md">
# SInputCheckbox


</docs>

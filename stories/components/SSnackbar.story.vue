<script setup lang="ts">
import SSnackbar from 'sefirot/components/SSnackbar.vue'

const actions = [
  { type: 'secondary', label: 'Close', callback: () => {} },
  { type: 'primary', label: 'OK', callback: () => {} },
]
</script>

<template>
  <Story title="Components/SSnackbar" :layout="{ type: 'single', iframe: false }">
    <SSnackbar
      text="Confirm this message."
      :actions="actions"
    />
  </Story>
</template>

<docs lang="md">
# SSnackbar


</docs>

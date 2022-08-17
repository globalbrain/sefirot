<script setup lang="ts">
import { computed } from 'vue'
import SDropdown from 'sefirot/components/SDropdown.vue'

const options = {
  title: 'Dropdown title',
  items : computed(() => [
    { type: 'text', text: 'Vue' },
    { type: 'text', text: 'Nuxt' },
    { type: 'text', text: 'Vite' }
  ]),
  closeOnClick: true
}

</script>

<template>
  <Story title="Components/SDropdown">
    <SDropdown
      :options="options"
    />
  </Story>
</template>

<docs lang="md">
# SDropdown


</docs>

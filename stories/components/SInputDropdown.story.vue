<script setup lang="ts">
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import { ref } from 'vue'

const value = ref([])

const options = [
  { type: 'text', text: 'Vue.js', value: 'vuejs' },
  { type: 'text', text: 'Adonis', value: 'adonis' },
  { type: 'text', text: 'Rails', value: 'rails' },
  { type: 'text', text: 'Sinatra', value: 'sinatra' },
  { type: 'text', text: 'Laravel', value: 'laravel' },
  { type: 'text', text: 'Phoenix', value: 'phoenix' }
]
</script>

<template>
  <Story title="Components/SInputDropdown">
    <SInputDropdown
      v-model="value"
      label="Dropdown input"
      placeholder="Please select items"
      search
      :options="options"
    />
  </Story>
</template>

<docs lang="md">
# SInputDropdown


</docs>

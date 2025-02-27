<script setup lang="ts">
import SInputDropdown, { type OptionText, type Size } from 'sefirot/components/SInputDropdown.vue'
import { ref } from 'vue'

const title = 'Components / SInputDropdown / 01. Playground'

const value = ref<string[]>([])

const options: OptionText[] = [
  { label: 'Vue.js', value: 'vuejs' },
  { label: 'Vite', value: 'vite' },
  { label: 'Adonis', value: 'adonis' },
  { label: 'Rails', value: 'rails' },
  { label: 'Sinatra', value: 'sinatra' },
  { label: 'Laravel', value: 'laravel' },
  { label: 'Phoenix', value: 'phoenix' }
]

function state() {
  return {
    size: 'small' as Size
  }
}
</script>

<template>
  <Story :init-state="state">
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          mini: 'mini',
          small: 'small',
          medium: 'medium'
        }"
        v-model="state.size"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title">
        <SInputDropdown
          :size="state.size"
          label="Frameworks"
          placeholder="Select frameworks"
          :options="options"
          nullable
          v-model="value"
        />
      </Board>
    </template>
  </Story>
</template>

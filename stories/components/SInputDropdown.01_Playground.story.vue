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

function initState() {
  return {
    size: 'small' as Size,
    position: 'bottom' as 'top' | 'bottom'
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
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
      <HstSelect
        title="position"
        :options="{
          top: 'top',
          bottom: 'bottom'
        }"
        v-model="state.position"
      />
    </template>

    <template #default="{ state }">
      <Board :title>
        <div class="foo">
          <SInputDropdown
            :size="state.size"
            :position="state.position"
            label="Frameworks"
            placeholder="Select frameworks"
            :options
            nullable
            v-model="value"
          />
        </div>
      </Board>
    </template>
  </Story>
</template>

<style scoped lang="postcss">
.foo {
  overflow: hidden;
  max-width: 400px;
  height: 300px;
  padding: 16px;
  border-radius: 6px;
  outline: 1px solid var(--c-divider);
}
</style>

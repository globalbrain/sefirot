<script setup lang="ts">
import SInputDropdown, { type OptionText } from 'sefirot/components/SInputDropdown.vue'
import { ref } from 'vue'

const title = 'Components / SInputDropdown / 01. Playground'

const singleValue = ref<string | null>(null)
const multiValue = ref<string[]>([])

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
    size: 'small',
    position: '',
    nullable: true
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
          '': 'auto',
          'top': 'top',
          'bottom': 'bottom'
        }"
        v-model="state.position"
      />
      <HstCheckbox
        title="nullable"
        v-model="state.nullable"
      />
    </template>

    <template #default="{ state }">
      <Board :title>
        <div class="s-flex s-flex-col s-gap-24">
          <SInputDropdown
            :size="state.size"
            :position="state.position || undefined"
            label="Single select"
            placeholder="Select a framework"
            :options
            :nullable="state.nullable"
            v-model="singleValue"
          />
          <SInputDropdown
            :size="state.size"
            :position="state.position || undefined"
            label="Multi select"
            placeholder="Select frameworks"
            :options
            :nullable="state.nullable"
            v-model="multiValue"
          />
        </div>
      </Board>
    </template>
  </Story>
</template>

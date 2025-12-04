<script setup lang="ts">
import SInputDropdown, { type OptionText } from 'sefirot/components/SInputDropdown.vue'
import { ref } from 'vue'

const title = 'Components / SInputDropdown / 01. Playground'

const singleValue = ref<string | null>(null)
const multiValue = ref<string[]>([])
const inlineValue = ref<string[]>([])

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
    size: 'md',
    position: '',
    nullable: true
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.size"
        title="size"
        :options="{
          sm: 'sm',
          md: 'md'
        }"
      />
      <HstSelect
        v-model="state.position"
        title="position"
        :options="{
          '': 'auto',
          'top': 'top',
          'bottom': 'bottom'
        }"
      />
      <HstCheckbox
        v-model="state.nullable"
        title="nullable"
      />
    </template>

    <template #default="{ state }">
      <Board :title>
        <div class="s-flex s-flex-col s-gap-24">
          <SInputDropdown
            v-model="singleValue"
            :size="state.size"
            :position="state.position || undefined"
            label="Single select"
            placeholder="Select a framework"
            :options
            :nullable="state.nullable"
          />
          <SInputDropdown
            v-model="multiValue"
            :size="state.size"
            :position="state.position || undefined"
            label="Multi select"
            placeholder="Select frameworks"
            :options
            :nullable="state.nullable"
          />
          <SInputDropdown
            v-model="inlineValue"
            :size="state.size"
            :position="state.position || undefined"
            label="Inline search (autocomplete)"
            placeholder="Type a framework and hit enter"
            :options
            :nullable="state.nullable"
            search="inline"
          />
        </div>
      </Board>
    </template>
  </Story>
</template>

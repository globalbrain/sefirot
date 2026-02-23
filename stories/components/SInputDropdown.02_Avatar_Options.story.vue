<script setup lang="ts">
import SInputDropdown, { type OptionAvatar, type Size } from 'sefirot/components/SInputDropdown.vue'
import { ref } from 'vue'

const title = 'Components / SInputDropdown / 02. Avatar Options'

const value = ref<number[]>([])

const options: OptionAvatar[] = [
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=4', label: 'Kris James', value: 1 },
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=5', label: 'Becky Lu', value: 2 },
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=7', label: 'Thomas Wane', value: 3 },
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=8', label: 'Linda Smith', value: 4 },
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=9', label: 'Monica Green', value: 5 },
  { type: 'avatar', image: 'https://i.pravatar.cc/64?img=10', label: 'Sefia Blue', value: 6 }
]

function initState() {
  return {
    size: 'md'
  } satisfies {
    size: Size
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
    </template>

    <template #default="{ state }">
      <Board :title>
        <SInputDropdown
          v-model="value"
          :size="state.size"
          label="Users"
          placeholder="Select users"
          :options
          nullable
        />
      </Board>
    </template>
  </Story>
</template>

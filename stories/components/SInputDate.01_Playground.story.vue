<script setup lang="ts">
import SInputDate from 'sefirot/components/SInputDate.vue'
import { ref } from 'vue'

const title = 'Components / SInputDate / 01. Playground'

const value = ref(null)

function initState() {
  return {
    size: 'md'
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
        v-model="state.tabindex"
        title="tabindex"
        :options="[0, -1]"
      />
    </template>

    <template #default="{ state }">
      <Board :title>
        <SInputDate
          v-model="value"
          label="Label"
          :size="state.size"
          :tabindex="state.tabindex"
        />
      </Board>
    </template>
  </Story>
</template>
